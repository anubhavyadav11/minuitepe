# Contributing

## Development

Requirements: Node.js 22 or newer and npm.

```bash
npm ci
npm start
```

The site is available at `http://localhost:3000`. The service readiness endpoint is `GET /health`.

## Pull requests

1. Create a feature branch from `main`.
2. Make a focused change and add or update tests.
3. Run `npm test` before opening a pull request.
4. Open a pull request against `main` and complete the pull request checklist.

Pull requests require CI to pass and should receive review from at least one other team member before merging. Maintainers merge through pull requests; direct pushes to `main` should be disabled in the repository branch protection settings.