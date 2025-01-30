require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { sendEmail } = require('./sendGridEmailAPI');
const { sendEmail } = require('./googleEmailAPI');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: [
      'http://localhost:5173', 
      'https://hiddengableestate.onrender.com',
      'https://hiddengableestate.com',
      'https://www.hiddengableestate.com',
  ]
}));
app.use(express.json());

app.post('/api/send-email', sendEmail);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
