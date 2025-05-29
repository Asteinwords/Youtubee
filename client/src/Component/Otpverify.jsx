// OtpVerify.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        alert("OTP Verified!");
        localStorage.setItem("Profile", JSON.stringify({ email }));
        navigate("/"); // Redirect to home
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Verification failed. Try again.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Enter OTP sent to {email}</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ marginBottom: 10, width: '300px' }}
      /><br />
      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
};

export default OtpVerify;
