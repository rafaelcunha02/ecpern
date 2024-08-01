const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  let { amount } = req.body;

  // Log the received amount for debugging
  console.log('Received amount:', amount);

  if (!amount || typeof amount !== 'number' || amount <= 0) {
	console.log('Invalid amount:', amount);
	return res.status(400).send({ error: 'Invalid amount' });
  }

  // Convert amount to integer (cents)
  amount = Math.round(amount * 100);

  // Log the converted amount for debugging
  console.log('Converted amount in cents:', amount);

  try {
	const paymentIntent = await stripe.paymentIntents.create({
	  amount,
	  currency: 'usd',
	});

	console.log('Payment Intent created:', paymentIntent);

	res.send({
	  clientSecret: paymentIntent.client_secret,
	});
  } catch (error) {
	console.error('Error creating payment intent:', error);
	res.status(500).send({ error: error.message });
  }
});

module.exports = router;