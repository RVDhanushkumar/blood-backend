const express = require("express");
const { addUser, getAllEntries, getEntryByGroup, editUser } = require("../controllers/user-controllers");
const userValidation = require("../middleware/userValidation");

const router = express.Router();

router.post('/register',userLimiter,addUser);
 router.get('/getAllEntries',getAllEntries)
 router.get('/getBy/:group',getEntryByGroup);

module.exports = router;
