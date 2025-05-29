// /Routes/payment.js
import express from 'express';
import { createOrder, captureOrder } from '../utils/paypal.js';
import { subscriptionPlans } from '../constants/subscriptionPlans.js';

const router = express.Router();

// Create PayPal Order
router.post('/create-order', async (req, res) => {
    try {
      const { amount } = req.body;  // Capture the amount passed from frontend
      console.log('Received amount for order creation:', amount);
  
      // Validate the amount
      if (!amount || isNaN(amount)) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      // Use the createOrder function from paypal.js to create a PayPal order
      const createOrderResponse = await createOrder(amount);

      console.log('PayPal Order Created:', createOrderResponse);
  
      // Respond with the order ID
      res.json({ id: createOrderResponse.id });
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

// Capture PayPal Order after success
router.post('/capture-order', async (req, res) => {
  try {
    const { orderId } = req.body;

    const result = await captureOrder(orderId);
    res.json({ message: 'Payment captured', result });
  } catch (err) {
    console.error('Capture order error:', err.message);
    res.status(500).json({ error: 'Failed to capture payment' });
  }
});

export default router;
