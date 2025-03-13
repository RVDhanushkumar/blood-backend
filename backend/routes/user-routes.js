const express=require('express');
 const router=express.Router();
 const { getAllEntries,getEntryByGroup,addUser, verificationtoken}=require('../controllers/user-controllers')
 const userLimiter=require('../middleware/rateLimiter');
// const router = express.Router();

router.post('/register',userLimiter,addUser);
 router.get('/getAllEntries',getAllEntries)
 router.get('/getBy/:group',getEntryByGroup);
 router.get("/verify/:token", verificationtoken)


module.exports = router;
