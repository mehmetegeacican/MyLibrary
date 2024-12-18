const express = require('express');
const rateLimit = require('express-rate-limit');

const { signUp, login } = require('../controller/authController');


const router = express.Router();

// Configure rate limiter for login
const loginRateLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 3, // Limit each IP to 3 requests per `windowMs`
    message: {
        status: 429,
        message: "Too many login attempts, please try again after 2 minutes",
    },
    standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post('/signup', signUp);
router.post('/login', loginRateLimiter, login);

module.exports = router;