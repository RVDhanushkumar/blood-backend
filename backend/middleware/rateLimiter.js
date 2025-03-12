const rateLimit = require("express-rate-limit");

const userLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: "Too many requests, please try again later.",
    },
});

module.exports = userLimiter;
