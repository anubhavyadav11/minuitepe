/**
 * Auth page interactions. Submission is intentionally local until a secure
 * authentication API is available; no credentials are stored in the browser.
 */

'use strict';

const AUTH_ERROR = 'Please check the highlighted fields.';

function passwordScore(value) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
}

function setFieldError(field, message) {
  const group = field.closest('.form-group, .auth-consent') || field.parentElement;
  let error = group && group.querySelector('.form-error');
  if (!error) {
    error = document.createElement('span');
    error.className = 'form-error';
    error.setAttribute('role', 'alert');
    group.appendChild(error);
  }
  field.setAttribute('aria-invalid', 'true');
  error.textContent = message;
}

function clearFieldError(field) {
  const group = field.closest('.form-group, .auth-consent') || field.parentElement;
  const error = group && group.querySelector('.form-error');
  if (error) error.remove();
  field.removeAttribute('aria-invalid');
}

function validateAuthForm(form) {
  let valid = true;
  const fields = [...form.querySelectorAll('input')];

  fields.forEach((field) => {
    clearFieldError(field);
    if (field.required && ((field.type === 'checkbox' && !field.checked) || (field.type !== 'checkbox' && !field.value.trim()))) {
      setFieldError(field, field.type === 'checkbox' ? 'Please accept the terms to continue.' : 'This field is required.');
      valid = false;
    } else if (field.type === 'email' && !field.validity.valid) {
      setFieldError(field, 'Enter a valid email address.');
      valid = false;
    } else if (field.minLength > 0 && field.value.length < field.minLength) {
      setFieldError(field, `Use at least ${field.minLength} characters.`);
      valid = false;
    }
  });

  const password = form.querySelector('[name="password"]');
  const confirmation = form.querySelector('[name="confirmPassword"]');
  if (password && confirmation && password.value !== confirmation.value) {
    setFieldError(confirmation, 'Passwords do not match.');
    valid = false;
  }

  return valid;
}

function initPasswordToggles() {
  document.querySelectorAll('[data-password-toggle]').forEach((toggle) => {
    const input = document.getElementById(toggle.dataset.passwordToggle);
    if (!input) return;
    toggle.addEventListener('click', () => {
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      toggle.textContent = visible ? 'Show' : 'Hide';
      toggle.setAttribute('aria-label', `${visible ? 'Show' : 'Hide'} password`);
    });
  });
}

function initPasswordStrength() {
  const input = document.querySelector('[name="password"]');
  const strength = document.querySelector('[data-password-strength]');
  if (!input || !strength) return;
  const bar = strength.querySelector('i');
  const label = strength.querySelector('.password-strength__label');
  const labels = ['Use 8+ characters with a mix of letters and numbers.', 'Keep going: add uppercase letters.', 'Good start: add a number.', 'Strong password. Add a symbol for extra protection.'];

  input.addEventListener('input', () => {
    const score = passwordScore(input.value);
    bar.style.width = `${score * 25}%`;
    bar.style.background = score >= 3 ? '#16a34a' : 'var(--food-secondary)';
    label.textContent = labels[Math.min(score, labels.length - 1)];
  });
}

function initAuthForms() {
  document.querySelectorAll('[data-auth-form]').forEach((form) => {
    const status = form.querySelector('[data-auth-status]');
    form.addEventListener('input', (event) => clearFieldError(event.target));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.className = 'auth-form__status';
      status.textContent = '';
      if (!validateAuthForm(form)) {
        status.classList.add('is-error');
        status.textContent = AUTH_ERROR;
        return;
      }
      status.classList.add('is-success');
      status.textContent = 'Your details are valid. Connect this form to the authentication API before going live.';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initPasswordStrength();
  initAuthForms();
});