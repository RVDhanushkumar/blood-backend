const nodemailer = require('nodemailer');
require('dotenv').config();

const sendBloodRequestEmail = async (email, subject, requesterDetails) => {
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
                    <h2 style="color: #d9534f; text-align: center;">Urgent Blood Request - ${requesterDetails.bloodGroup}</h2>
                    <p>Dear Donor,</p>
                    <p>We have received an urgent blood request for <strong>${requesterDetails.bloodGroup}</strong>. Your contribution can save a life!</p>
                    
                    <h3 style="color: #d9534f;">Requester Details:</h3>
                    <p><strong>Name:</strong> ${requesterDetails.fullName}</p>
                    <p><strong>Phone:</strong> <a href="tel:${requesterDetails.phone}">${requesterDetails.phone}</a></p>
                    <p><strong>Email:</strong> <a href="mailto:${requesterDetails.email}">${requesterDetails.email}</a></p>
                    <p><strong>Location:</strong> ${requesterDetails.location}</p>

                    <p style="color: #d9534f; font-size: 16px;"><strong>Please respond as soon as possible if you can help.</strong></p>

                    <div style="text-align: center; margin: 20px 0;">
                        <a href="tel:${requesterDetails.phone}" 
                           style="background-color: #d9534f; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                            Contact Requester
                        </a>
                    </div>

                    <p>If you are unavailable to donate, please share this request with others.</p>
                    <p>Thank you for your generosity and support.</p>
                    <p><strong>- The ANES-Blood Donor Team</strong></p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Blood request email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendBloodRequestEmail;
