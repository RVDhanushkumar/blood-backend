const rateLimit = require("express-rate-limit");
const user = require("../models/user");




const userLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 5, 
    message: {
      success: false,
      message: "Nigga you tryna hack me??",
    },
  });

module.exports=userLimiter