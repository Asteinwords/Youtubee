import nodemailer from "nodemailer";
import twilio from "twilio";

const EMAIL_FROM = "your_email@gmail.com";
const TWILIO_SID = "YOUR_TWILIO_SID";
const TWILIO_AUTH = "YOUR_TWILIO_AUTH";
const TWILIO_PHONE = "YOUR_TWILIO_PHONE";

const client = twilio(TWILIO_SID, TWILIO_AUTH);

export async function sendOtpEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_FROM,
            pass: "your_gmail_app_password"
        }
    });

    await transporter.sendMail({
        from: EMAIL_FROM,
        to: email,
        subject: "Your Login OTP",
        text: `Your OTP is ${otp}`,
    });
}

export async function sendOtpSMS(phone, otp) {
    await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: TWILIO_PHONE,
        to: phone,
    });
}
