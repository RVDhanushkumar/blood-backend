const { z } = require('zod');


const user = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    age: z.number().int().positive().max(120, "Age must be a valid number between 18 and 120"),
    gender: z.enum(["Male", "Female", "Other"], "Gender must be either Male, Female, or Other"),
    bloodgroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Blood group must be a valid type"),
    mobile: z.string().regex(/^\d{10}$/, "Mobile number must be a 10 digit number"),
    email: z.string().email("Email must be a valid email address"),
    address: z.string().min(1, "Address is required")
});

module.exports=user;