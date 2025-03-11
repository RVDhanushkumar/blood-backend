const express = require("express");
const axios = require("axios");
const User = require("../models/user");
const userValidation = require("../middleware/userValidation"); // Validation middleware
const { userSchema } = require("../middleware/userValidation"); // Import schema directly

const router = express.Router();

async function addUser(req, res) {
    let { firstname, lastname, age, gender, bloodgroup, mobile, email, address, captcha } = req.body;
    age = parseInt(age);

    // Validate input using Zod schema
    const validationResult = userSchema.safeParse({ firstname, lastname, age, gender, bloodgroup, mobile, email, address });

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.error.errors.map((err) => err.message).join(", "),
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

        // Create new user
        const newUser = await User.create({ firstname, lastname, age, gender, bloodgroup, mobile, email, address });
        return res.status(201).json({
            success: true,
            message: `User ${firstname} registered successfully`,
        });

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
    const { email, firstname, lastname, age, gender, bloodgroup, mobile, address } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { firstname, lastname, age, gender, bloodgroup, mobile, address },
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

// Apply validation only to the POST route
router.post("/addUser", userValidation, addUser);
router.get("/allUsers", getAllEntries);
router.get("/group/:group", getEntryByGroup);
router.put("/editUser", editUser);

module.exports = router;
