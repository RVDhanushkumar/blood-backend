const express=require('express');
 const router=express.Router();
 const { getAllEntries,getEntryByGroup,addUser, verificationtoken, reqblood}=require('../controllers/user-controllers')
 const userLimiter=require('../middleware/rateLimiter');


router.post('/register',userLimiter,addUser);
 router.get('/getAllEntries',getAllEntries)
 router.get('/getBy/:group',getEntryByGroup);
 router.get("/verify/:token", verificationtoken)
 router.post('/request-blood',reqblood);

module.exports = router;
