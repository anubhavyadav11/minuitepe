const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- API Endpoints ---

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    const { name, phone, email, service, message } = req.body;
    
    // In a real application, you would save this to a database or send an email.
    // For now, we just log it and send a success response.
    console.log('--- New Contact Form Submission ---');
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`Service: ${service}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
});

// Fallback to index.html for undefined routes (useful if you add client-side routing later)
app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        next();
    }
});

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running locally at http://localhost:${PORT}`);
    });
}

module.exports = app;
