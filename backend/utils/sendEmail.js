const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, subject, verificationLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"ANES-Blood Donor" <no-reply@anesblooddonor.com>`,
            to: email,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #d9534f; text-align: center;">Welcome to ANES-Blood Donor</h2>
                    <p>Dear Donor,</p>
                    <p>Thank you for registering with <strong>ANES-Blood Donor</strong>. Your willingness to donate blood can save lives.</p>
                    <p>To complete your registration and verify your email, please click the button below:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${verificationLink}" 
                           style="background-color: #d9534f; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                            Verify Your Email
                        </a>
                    </div>
                    <p>If you did not sign up for Blood Connect, please ignore this email.</p>
                    <p>Thank you for being a hero.</p>
                    <p><strong>- The ANES-Blood Donor Team </strong></p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
