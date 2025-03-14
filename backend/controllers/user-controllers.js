const express = require("express");
const axios = require("axios");
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const requestEmail = require("../utils/requestEmail");
const User = require("../models/user");
const { userValidation, userSchema } = require("../middleware/userValidation"); 
const userLimiter = require("../middleware/rateLimiter");

const router = express.Router();

async function addUser(req, res) {
    let { fullName, age, gender, bloodgroup, mobile, email, address, captcha } = req.body;
    age = parseInt(age);
    

    // Validate input using Zod schema
    const validationResult = userSchema.safeParse({ fullName, age, gender, bloodgroup, mobile, email, address });

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            errors: validationResult.error.errors.map(err => ({
                path: err.path.join("."),
                message: err.message,
            })),
        });
    }

    if (!captcha) {
        return res.status(400).json({
            success: false,
            message: "CAPTCHA is required",
        });
    }

    try {
        const captchaVerifyURL = `https://www.google.com/recaptcha/api/siteverify`;
        const secretKey = process.env.CAPTCHA_SECRET_KEY;

        const captchaResponse = await axios.post(captchaVerifyURL, null, {
            params: {
                secret: secretKey,
                response: captcha,
            },
        });

        if (!captchaResponse.data.success) {
            return res.status(403).json({
                success: false,
                message: "CAPTCHA verification failed",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email, use another email",
            });
        }
        
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Create new user
        const newUser = await User.create({ fullName, age, gender, bloodgroup, mobile, email, address , isVerified:false, verificationToken:verificationToken });
        const verificationLink = `https://blood-ey76.onrender.com/user/verify/${verificationToken}`;
        await sendEmail(email, 'Verification of Email for ANES Blood Donor', verificationLink);

        res.status(201).json({ msg: 'Registration successful, check your email for verification link' });

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error occurred",
        });
    }
}

async function getAllEntries(req, res) {
    try {
        const data = await User.find();
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No entries found",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred",
        });
    }
}

async function getEntryByGroup(req, res) {
    const bloodgroup = req.params.group;
    try {
        const data = await User.find({ bloodgroup });
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No user found with this blood group",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred",
        });
    }
}

async function editUser(req, res) {
    const { email, fullName, age, gender, bloodgroup, mobile, address } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { fullName, age, gender, bloodgroup, mobile, address },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
            data: updatedUser,
        });

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred",
        });
    }
}
async function verificationtoken(req,res) {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(400).json({ msg: 'Invalid verification link' });

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationExpires = undefined;
        await user.save();
        res.redirect("https://anes-blood-donor.vercel.app");
    } catch (error) {
        res.status(500).json({ error: 'Invalid or expired token' });
    }
}

async function reqblood(req,res){
    try {
        const { fullName, phone, email, bloodGroup, location } = req.body;

        if (!fullName || !phone || !email || !bloodGroup || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const donors = await User.find({ bloodGroup, isVerified: true });

        if (donors.length === 0) {
            return res.status(404).json({ message: "No donors found for this blood group" });
        }

        const donorEmails = donors.map(donor => donor.email);

        for (const donorEmail of donorEmails) {
            await requestEmail(donorEmail, `Urgent Blood Request - ${bloodGroup}`, {
                fullName, phone, email, bloodGroup, location
            });
        }

        res.status(200).json({
            message: `Blood request sent successfully to ${donors.length} donors`,
            notifiedDonors: donorEmails
        });
    } catch (error) {
        console.error("Error processing blood request:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Apply validation only to the POST route
router.post("/addUser", userLimiter, userValidation, addUser);
router.get("/allUsers", getAllEntries);
router.get("/group/:group", getEntryByGroup);
router.put("/editUser", editUser);
router.get("/verify/:token",verificationtoken);
router.post("/request-blood",reqblood);

module.exports = {
    addUser,
    getAllEntries,
    getEntryByGroup,
    editUser,
    verificationtoken,
    reqblood,
};
