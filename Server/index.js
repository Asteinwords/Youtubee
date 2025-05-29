// // index.js (or server.js)
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import path from "path";

// import videoroutes from './Routes/video.js';
// import userroutes from './Routes/User.js';
// import commentroutes from './Routes/comment.js';
// import payment from './Routes/payment.js';
// import subscriptionRoute from './Routes/subscription.js';

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join('uploads')));

// app.get('/', (req, res) => {
//   res.send("Your tube is working");
// });

// app.use('/user', userroutes);
// app.use('/video', videoroutes);
// app.use('/comment', commentroutes);
// app.use('/api/payment', payment);
// app.use('/api/subscription', subscriptionRoute);

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.DB_URL).then(() => {
//   console.log("MongoDB Database connected");
//   app.listen(PORT, () => {
//     console.log(`Server running on Port ${PORT}`);
//   });
// }).catch((error) => {
//   console.log(error);
// });
// server.js (or index.js)
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import axios from 'axios';

import videoroutes from './Routes/video.js';
import userroutes from './Routes/User.js';
import commentroutes from './Routes/comment.js';
import payment from './Routes/payment.js';
import subscriptionRoute from './Routes/subscription.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join('uploads')));

app.get('/', (req, res) => {
  res.send("Your tube is working");
});

app.use('/user', userroutes);
app.use('/video', videoroutes);
app.use('/comment', commentroutes);
app.use('/api/payment', payment);
app.use('/api/subscription', subscriptionRoute);

// --------------- OTP & Theme Logic -----------------

const southIndiaStates = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function getLocationFromIP(ip) {
  try {
    const res = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ip}`);
    return res.data.state_prov;
  } catch (err) {
    console.error('Geolocation API error:', err.message);
    return null;
  }
}

app.post('/api/login', async (req, res) => {
  const { email, mobile, ip } = req.body;

  const state = await getLocationFromIP(ip);
  const loginTime = new Date();
  const hour = loginTime.getHours();

  const isSouthIndia = southIndiaStates.some(
    s => state && state.toLowerCase().includes(s.toLowerCase())
  );

  // Theme: white if between 10AM-12PM & South Indian state, else dark
  const theme = (hour >= 10 && hour < 12 && isSouthIndia) ? 'white' : 'dark';

  const otp = generateOTP();

  if (isSouthIndia) {
    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Verification Code',
      text: `Your OTP is: ${otp}`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log(`OTP sent via email to ${email}`);
      return res.json({ success: true, method: 'email', theme });
    } catch (err) {
      console.error('Email OTP error:', err);
      return res.status(500).json({ success: false, message: 'Failed to send email OTP' });
    }
  } else {
    // Send OTP via SMS
    try {
      await twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: mobile,
      });
      console.log(`OTP sent via SMS to ${mobile}`);
      return res.json({ success: true, method: 'sms', theme });
    } catch (err) {
      console.error('SMS OTP error:', err);
      return res.status(500).json({ success: false, message: 'Failed to send SMS OTP' });
    }
  }
});

// ----------------------------------------------------

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("MongoDB Database connected");
  app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});
