// src/Component/PayPalCheckout.jsx
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const PayPalCheckout = ({ amount, plan, onSuccess }) => {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={async () => {
        try {
          console.log("Creating PayPal order with amount:", amount);
          const { data } = await axios.post("http://localhost:5000/api/payment/create-order", { amount });
          console.log("Order created successfully. Order ID:", data.id);
          return data.id;
        } catch (err) {
          console.error("Error creating PayPal order:", err.response?.data || err.message);
          throw err;  // This triggers the `onError` callback
        }
      }}
      
      onApprove={async (data) => {
        try {
          const orderId = data.orderID;
          console.log("Order approved. Capturing order:", orderId);

          // Capture payment with backend
          const res = await axios.post("http://localhost:5000/api/payment/capture-order", { orderId });
          console.log("Payment captured successfully:", res.data);

          // Activate subscription after successful payment
          console.log("Activating subscription for plan:", plan.name);
          const subRes = await axios.post("http://localhost:5000/api/subscription/activate", {
            planName: plan.name,
            planAmount: plan.amount, // Make sure to pass plan amount
            paymentInfo: res.data,
          });
          console.log("Subscription activation response:", subRes.data);

          onSuccess(res.data);
        } catch (err) {
          console.error("Error during payment capture or subscription activation:", err.response?.data || err.message);
          alert("Something went wrong while processing your payment or activating the subscription.");
        }
      }}
      onError={(err) => {
        console.error("PayPal SDK Error:", err);
        alert("PayPal payment failed.");
      }}
    />
  );
};

export default PayPalCheckout;
