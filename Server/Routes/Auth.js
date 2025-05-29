import express from "express";
import { getClientLocation, isSouthIndianState } from "../utils/locationutils.js";
import { sendOtpEmail, sendOtpSMS } from "../utils/otputils.js";

const router = express.Router();

// Dummy OTP generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

router.post("/login", async (req, res) => {
    const { email, phone } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const region = getClientLocation(ip);

    const otp = generateOTP();
    const fromSouth = isSouthIndianState(region);

    try {
        if (fromSouth) {
            await sendOtpEmail(email, otp);
            res.json({ message: "OTP sent to email", theme: "light" });
        } else {
            await sendOtpSMS(phone, otp);
            res.json({ message: "OTP sent to mobile", theme: "dark" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to send OTP" });
    }
});
router.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] === otp) {
      delete otpStore[email]; // remove OTP after verification
      return res.json({ success: true });
    }
    return res.json({ success: false });
  });

export default router;
