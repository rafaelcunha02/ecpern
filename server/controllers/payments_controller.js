const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
	return res.status(400).send({ error: 'Invalid amount' });
  }


  amount = Math.round(amount * 100);


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