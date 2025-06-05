const nodemailer = require('nodemailer');

const isDev = process.env.NODE_ENV === 'development';

const emailAccount = isDev 
    ? process.env.DEVRISE_GOOGLE_EMAIL_ACCOUNT 
    : process.env.GOOGLE_EMAIL_ACCOUNT;
const emailPassword = isDev 
    ? process.env.DEVRISE_GOOGLE_APP_PASSWORD 
    : process.env.GOOGLE_APP_PASSWORD;
console.log(`Using email account: ${emailAccount}`);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailAccount, // Your Gmail address
        pass: emailPassword // Your Gmail app-specific password
    }
});

const sendEmail = async (req, res) => {
    try {
        const { name, email, message, website } = req.body;
        // Email options
        const mailOptions = {
            from: emailAccount,
            to: emailAccount, // Receiving at the same address
            subject: `Inquiries- ${website || 'Unknown source'}`,
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
            html: `
                <h3>New Inquiry from ${website}</h3>
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