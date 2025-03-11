const express = require("express");
const { addUser, getAllEntries, getEntryByGroup, editUser } = require("../controllers/user-controllers");
const userValidation = require("../middleware/userValidation");

const router = express.Router();

router.post("/addUser", userValidation, addUser);
router.get("/allUsers", getAllEntries);
router.get("/group/:group", getEntryByGroup);
router.put("/editUser", editUser);

module.exports = router;
