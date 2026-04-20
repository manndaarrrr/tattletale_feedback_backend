require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Allow requests from localhost and the eventual GoDaddy domain
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*';
app.use(cors({
    origin: allowedOrigins
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route (Used by Render/Hosting to ensure server is alive)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running correctly.' });
});

// Email Transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Helper function to sanitize input
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

app.post('/api/feedback', async (req, res) => {
    try {
        const { rating, helpStatus, message, honeypot } = req.body;

        // 1. Check honeypot for spam protection
        if (honeypot && honeypot.trim() !== '') {
            return res.status(200).json({ success: true, message: 'Feedback received.' });
        }

        // 2. Validate required fields
        if (!rating || !helpStatus || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }

        // 3. Sanitize inputs
        const safeRating = escapeHtml(rating.toString());
        const safeHelpStatus = escapeHtml(helpStatus.toString());
        const safeMessage = escapeHtml(message.toString());

        // 4. Construct email
        const mailOptions = {
            from: `"Turtle Tales Feedback" <${process.env.SMTP_USER}>`,
            to: process.env.MAIL_TO,
            subject: 'New Website Feedback Submission',
            html: `
                <h2>New Website Feedback Submission</h2>
                <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
                <br>
                <p><strong>Star Rating:</strong> ${safeRating} out of 5</p>
                <p><strong>Did you get the help you needed?</strong> ${safeHelpStatus}</p>
                <p><strong>Suggestion / Comment:</strong></p>
                <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
                    ${safeMessage.replace(/\n/g, '<br>')}
                </blockquote>
            `
        };

        // 5. Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Feedback submitted successfully!' });

    } catch (error) {
        console.error('Email submission error:', error);
        res.status(500).json({ success: false, error: 'Failed to submit feedback. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Turtle Tales backend running on port ${PORT}`);
});
