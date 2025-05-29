// /Routes/subscription.js
import express from 'express';
import { subscriptionPlans } from '../constants/subscriptionPlans.js';
import User from '../Models/Auth.js';

const router = express.Router();

// /Routes/subscription.js
router.post('/activate', async (req, res) => {
    const { planName, planAmount } = req.body; // Ensure you're receiving plan info properly
    const userId = req.userId; // Use middleware in production
  
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  
    const plan = subscriptionPlans[planName];
    if (!plan) return res.status(400).json({ error: 'Invalid subscription plan' });
  
    const now = new Date();
    const endDate = planName === "Gold" ? null : new Date(now.getTime() + plan.durationMinutes * 60000);
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          subscription: {
            plan: planName,
            startDate: now,
            endDate: endDate,
          },
        },
        { new: true }
      );
  
      res.json({
        message: `Subscription activated: ${planName}`,
        subscription: updatedUser.subscription,
      });
    } catch (err) {
      console.error('Subscription activation error:', err.message);
      res.status(500).json({ error: 'Subscription activation failed' });
    }
  });
  

export default router;

// routes/subscription.js
// import express from "express";
// import Subscription from "../constants/subscriptionPlans.js"
// import User from "../models/Auth.js";
// import nodemailer from "nodemailer";

// const router = express.Router();

// router.post("/activate", async (req, res) => {
//     const { planName, planAmount, paymentInfo } = req.body;
//     const userId = req.user.id; // Assuming you use JWT middleware

//     try {
//         const subscription = new Subscription({
//             user: userId,
//             plan: planName,
//             amount: planAmount,
//             activatedAt: new Date(),
//             paymentId: paymentInfo.id,
//         });

//         await subscription.save();
//         await User.findByIdAndUpdate(userId, { currentPlan: planName });

//         const user = await User.findById(userId);
        
//         // ✅ Send email invoice
//         const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//                 user: process.env.EMAIL_USER, // your email
//                 pass: process.env.EMAIL_PASS  // your password or app password
//             }
//         });

//         const mailOptions = {
//             from: `"YouTube Clone" <${process.env.EMAIL_USER}>`,
//             to: user.email,
//             subject: `Invoice for ${planName} Plan`,
//             html: `
//                 <h2>Thanks for subscribing to the ${planName} plan!</h2>
//                 <p><strong>Amount Paid:</strong> $${planAmount}</p>
//                 <p><strong>Transaction ID:</strong> ${paymentInfo.id}</p>
//                 <p>Date: ${new Date().toLocaleString()}</p>
//                 <p>Enjoy your enhanced features! 🎉</p>
//             `
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: "Subscription activated and email sent." });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Subscription activation failed." });
//     }
// });

// export default router;
