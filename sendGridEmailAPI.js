const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;
    console.log(name, email, message);
    const msg = {
        to: process.env.SENDGRID_VERIFIED_SENDER, // Recipient
        from: process.env.SENDGRID_VERIFIED_SENDER, // Verified sender
        subject: 'Inquiry- Hidden Gable Estate',
        text: `
        Name: ${name}
        Email: ${email}
    
        Message:
        ${message}
        `,
        html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        `,
    };
    
    try {
        const response = await sgMail.send(msg);
        console.log(response);
        res.status(200).json({ message: 'Email sent successfully'});
    } catch (error) {
        console.error('Email sending error', error);
        res.status(500).json({ message: 'Failed to send email', error: error.toString() });
    }
}

module.exports = { sendEmail };