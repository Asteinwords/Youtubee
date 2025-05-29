import React from "react";
import PayPalCheckout from "./PayPalCheckout";

const SubscriptionPage = () => {
  const plans = [
    { name: "Bronze", amount: 0.1, minutes: 7 },
    { name: "Silver", amount: 50, minutes: 10 },
    { name: "Gold", amount: 100, minutes: "Unlimited" },
  ];

  const handleSuccess = (paymentData) => {
    alert("Subscription activated successfully!");
    console.log("✅ Final Payment and Subscription Data:", paymentData);
    // Optionally: refresh user context or call Redux action here
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Select a Subscription Plan</h2>
      {plans.map((plan) => (
        <div
          key={plan.name}
          style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
        >
          <h3>{plan.name} Plan</h3>
          <p>Price: ${plan.amount}</p>
          <p>Video Watch Time: {plan.minutes} minutes</p>
          <PayPalCheckout amount={plan.amount} plan={plan} onSuccess={handleSuccess} />
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPage;
