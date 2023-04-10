const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 5001;

// Load stored user data from local file
const userData = JSON.parse(fs.readFileSync('users.json'));

// Register endpoint
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  if (userData[email]) {
    return res.json({ success: false, message: 'User already exists' });
  }

  // Add new user data to the stored user data
  userData[email] = { name, email, password };
  fs.writeFileSync('users.json', JSON.stringify(userData));

  res.json({ success: true });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  if (!userData[email]) {
    return res.json({ success: false, message: 'User does not exist' });
  }

  // Check if password is correct
  if (userData[email].password !== password) {
    return res.json({ success: false, message: 'Incorrect password' });
  }

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/////////////////////////attempt with verifying email when registering
// const express = require('express');
// const app = express();
// const fs = require('fs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
//
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
// const PORT = 5001;
//
// // Load stored user data from local file
// const userData = JSON.parse(fs.readFileSync('users.json'));
//
// // Register endpoint
// app.post('/register', (req, res) => {
//   const { name, email, password } = req.body;
//
//   // Check if user already exists
//   if (userData[email]) {
//     return res.json({ success: false, message: 'User already exists' });
//   }
//
//   // Add new user data to the stored user data
//   userData[email] = { name, email, password };
//   fs.writeFileSync('users.json', JSON.stringify(userData));
//
//   // Send email verification to the provided email address
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your-email-address@gmail.com',
//       pass: 'your-email-password'
//     }
//   });
//
//   const mailOptions = {
//     from: 'your-email-address@gmail.com',
//     to: email,
//     subject: 'Verify your email address',
//     html: `<p>Please click on the link to verify your email address: <a href="http://localhost:3000/verify-email?email=${email}">http://localhost:3000/verify-email?email=${email}</a></p>`
//   };
//
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.json({ success: false, message: 'Failed to send email verification' });
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.json({ success: true, message: 'Email verification sent' });
//     }
//   });
// });
//
// // Verify email endpoint
// app.get('/verify-email', (req, res) => {
//   const { email } = req.query;
//
//   // Check if user exists
//   if (!userData[email]) {
//     return res.redirect('/register?error=User does not exist');
//   }
//
//   // Update user data with email verification status
//   userData[email].isVerified = true;
//   fs.writeFileSync('users.json', JSON.stringify(userData));
//
//   res.redirect('/register?success=Email address verified');
// });
//
// // Login endpoint
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//
//   // Check if user exists
//   if (!userData[email]) {
//     return res.json({ success: false, message: 'User does not exist' });
//   }
//
//   // Check if password is correct
//   if (userData[email].password !== password) {
//     return res.json({ success: false, message: 'Incorrect password' });
//   }
//
//   // Check if email address is verified
//   if (!userData[email].isVerified) {
//     return res.json({ success: false, message: 'Email address not verified' });
//   }
//
//   res.json({ success: true });
// });
//
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
