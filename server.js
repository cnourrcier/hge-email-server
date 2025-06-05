require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendEmail } = require('./googleEmailAPI');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = [
      'https://hiddenestate.com',
      'https://hiddenestate.onrender.com',
    //   'https://www.hiddengableestate.com',
      'https://summitlodgebigbear.com',
];

if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173');
  allowedOrigins.push('http://localhost:5174');
}

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

app.post('/api/send-email', sendEmail);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
