const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_EMAIL_ACCOUNT, // Your Gmail address
        pass: process.env.GOOGLE_APP_PASSWORD // Your Gmail app-specific password
    }
});

const sendEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log("HI IM HERE");
        // Email options
        const mailOptions = {
            from: process.env.GOOGLE_EMAIL_ACCOUNT,
            to: process.env.GOOGLE_EMAIL_ACCOUNT,
            subject: 'Inquiries- Hidden Gable Estate',
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
            html: `
                <h3>New Inquiry</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
        console.log("EMAIL SENT SUCCESSFULLY")
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

module.exports = { sendEmail };