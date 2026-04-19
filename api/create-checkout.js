const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productId, phone, email } = req.body;

  const prices = {
    '6pack': 3000,
    '12pack': 5000,
    'single': 1200,
    'square': 1200,
    'rectangle': 1200,
    'puzzle': 1800
  };

  const productNames = {
    '6pack': '6‑Pack Magnet Set',
    '12pack': '12‑Pack Magnet Set',
    'single': 'Single Magnet',
    'square': '2.5" × 2.5" Square Magnet',
    'rectangle': '2" × 3" Rectangle Magnet',
    'puzzle': 'Puzzle Magnet Set'
  };

  const amount = prices[productId];
  if (!amount) {
    return res.status(400).json({ error: 'Invalid product' });
  }

  const productName = productNames[productId] || productId;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
            description: `Custom photo magnet – ${productName} – reference: ${phone}`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.SUCCESS_URL || 'https://protean-earth.vercel.app/success.html'}?session_id={CHECKOUT_SESSION_ID}&phone=${encodeURIComponent(phone)}`,
    cancel_url: `${process.env.CANCEL_URL || 'https://protean-earth.vercel.app/shop.html'}`,
    metadata: {
      phone,
      productId,
    },
    customer_email: email,
  });

  res.json({ url: session.url });
};
