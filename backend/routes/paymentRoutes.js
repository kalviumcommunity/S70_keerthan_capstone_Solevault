const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create-checkout-session', authMiddleware, async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription', // We are selling a subscription
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'SoleVault Pro',
                            description: 'Unlock advanced analytics and collection management tools.',
                        },
                        unit_amount: 1000, // Amount in cents ($10.00)
                        recurring: {
                            interval: 'month', // Billed monthly
                        },
                    },
                    quantity: 1,
                },
            ],
            // Replace these with your actual frontend URLs
            success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/dashboard`,
        });

        res.json({ url: session.url }); // Send the Stripe page URL back to the frontend

    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: { message: error.message } });
    }
});

module.exports = router;