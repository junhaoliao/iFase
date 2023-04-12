const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';
const expirationTime = '1m'; // Expiration time for JWT token

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
  if (userData[name]) {
    return res.json({ success: false, message: 'User already exists' });
  }
  if (userData[email]) {
    return res.json({ success: false, message: 'User email already registered' });
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

  // Generate JWT token
  const token = jwt.sign({ email }, secretKey, { expiresIn: expirationTime });

  res.json({ success: true, token });
});

// Profile endpoint
app.get('/profile', verifyToken, (req, res) => {
  // Get user email from decoded token
  const email = req.decoded.email;

  // Retrieve user data from stored user data
  const user = userData[email];

  res.json({ success: true, user });
});

app.get('/logout', (req, res) => {
  // Clear the authentication token from the session or cookie
  req.session.destroy(); // if you are using session
  res.clearCookie('token'); // if you are using cookie

  // Return a response indicating that the user has been logged out
  res.json({ message: 'You have been logged out.' });
});

// Middleware for verifying JWT token
function verifyToken(req, res, next) {
  // Get token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, message: 'No token provided' });
  }

  // Verify token and decode it
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
    }

    // Save decoded token in request object
    req.decoded = decoded;
    next();
  });
}



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