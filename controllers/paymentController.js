const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
    try {
        const { cartItems, customerName, customerAddress } = req.body;
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: "INR",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.qty
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            payment_intent_data: {
                setup_future_usage: 'off_session',
                shipping: {
                    name: customerName,
                    address: {
                        line1: customerAddress.line1,
                        country: 'India',
                    },
                },
            },
        });
        // console.log(session,"========")
        res.json({ url: session.id });
    } catch (err) {
        console.error("Payment error:", err);
        res.status(500).json({ err: err.message });
    }
};

module.exports = { processPayment };
