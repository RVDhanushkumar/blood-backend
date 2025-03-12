const { z } = require("zod");

const userSchema = z.object({
    fullName: z.string().min(1, { message: "Name is required" }),
    age: z.number().int().positive().min(18, { message: "Age must be between 18 and 120" }).max(120),
    gender: z.enum(["Male", "Female", "Other"], { message: "Gender must be either Male, Female, or Other" }),
    bloodgroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], { message: "Blood group must be a valid type" }),
    mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be a 10-digit number" }),
    email: z.string().email({ message: "Email must be a valid email address" }),
    address: z.string().min(1, { message: "Address is required" }),
});

// Middleware function to validate request body
const userValidation = (req, res, next) => {
    const validationResult = userSchema.safeParse(req.body);
    
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            errors: validationResult.error.errors.map(err => ({
                path: err.path.join("."),
                message: err.message,
            })),
        });
    }
    
    next();
};

module.exports = { userValidation, userSchema };
