const express = require('express');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
  origin: [
      'http://localhost:5173', 
      'https://hiddengableestate.onrender.com',
      'https://hiddengableestate.com',
      'https://www.hiddengableestate.com',
  ]
}));
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

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
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
