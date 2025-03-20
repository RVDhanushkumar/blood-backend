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
            from: `"ANES-Blood Donor" <support@anes-blood-donor.com>`,
            to: email,
            subject: subject,
            text: `Verification link: ${verificationLink} `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
