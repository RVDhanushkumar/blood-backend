const express=require('express')
const axios=require("axios")
const User=require('../models/user');


    async function addUser(req,res){
        const { firstname, lastname, age, gender, bloodgroup, mobile, email, address,captcha } = req.body; 
        // const { firstname, lastname, age, gender, bloodgroup, mobile, email, address } = req.body; 

        if(!captcha){
            res.status(404).json({
                 success:false,
                message:"captcha required"
            })
        }
        
        try{
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



            const existing=await User.findOne({email});
            if(!existing){
                const newUser=await User.create({
                    firstname,
                    lastname,
                    age,
                    gender,
                    bloodgroup,
                    mobile,
                    email,
                    address
                });
                if(newUser){
                    res.status(201).json({
                        success:true,
                        message:` user ${firstname} registered successfully`
                    })
                }
                else{
                    res.status(500).json({
                        success:false,
                        message:"unexpected error"
                    })
                }
            }
            else{
                res.status(409).json({
                    success:false,
                    message:"user already exists with the email, use another email"
                })
            }

        }
        catch(error){
            console.error("some error");
            res.status(500).json({
                success:false,
                message:"server error"
            })
        }
    }

async function getAllEntries(req, res) {
    try {
        const data = await User.find();
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({
                success: false,
                message: "No entries found"
            });
        }
    } catch (error) {
        console.error("server error", error);
        res.status(500).json({
            success: false,
            message: "Unexpected error occurred"
        });
    }
}


async function getEntryByGroup(req,res){
    const bloodgroup=req.params.group;
    try{
        const data=await User.find({bloodgroup:bloodgroup});
        if(data){
            res.status(201).json(data)
        }
        else{
            res.status(401).json({
                success:false,
                message:"no user found"
            })
        }

    }
    catch(error){
        console.error("server error")
        res.status(500).json({
            success:false,
            message:"unexpected error occured"
        })
    }

}

module.exports={
    getAllEntries,
    getEntryByGroup,
    addUser
}