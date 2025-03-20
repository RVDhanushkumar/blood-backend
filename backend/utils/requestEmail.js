const nodemailer = require('nodemailer');


const sendBloodRequestEmail = async (email, subject, requesterDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"ANES-Blood Donor" <support@anesblooddonor.com>`,
            to: email,
            subject: subject,
            text:`Your Blood is need to email: ${requesterDetails.email}, Phone no.: ${requesterDetails.phone}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Blood request email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendBloodRequestEmail;
