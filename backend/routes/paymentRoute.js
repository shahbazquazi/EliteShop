const express = require('express');
const { processPayment,myStripeApiKey} = require('../controllers/paymentController');
const router = express.Router();
const {isAuthenticatedUser} = require('../middleware/auth');

router.post('/payment/process',isAuthenticatedUser,processPayment);
router.get('/stripeapikey',isAuthenticatedUser,myStripeApiKey);

module.exports = router;
