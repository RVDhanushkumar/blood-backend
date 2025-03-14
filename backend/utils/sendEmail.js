const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (name, email, subject, verificationLink) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com', 
            port: process.env.SMTP_PORT || 587, 
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"ANES Blood Donation Network" <no-reply@anes-blood-donor.com>`,
            to: email,
            subject: subject,
            text: `Hello ${name},\n\nWe appreciate your willingness to help those in need. Your support can make a difference in someone's life.\n\nTo confirm your participation, please visit the link below:\n\n${verificationLink}\n\nIf you have any questions, feel free to contact us at support@anes-blood-donor.com.\n\nBest regards,\nANES Blood Donation Team`,

            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #d9534f; text-align: center;">Join Our Blood Donation Network</h2>
                    <p>Hello <strong>${name}</strong>,</p>
                    <p>We deeply appreciate your interest in contributing to our community. A single act of kindness can make a significant difference.</p>
                    <p>To confirm your participation and stay updated on donation opportunities, please click the button below:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${verificationLink}" 
                           style="background-color: #d9534f; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                            Confirm Your Participation
                        </a>
                    </div>
                    <p>If this message was sent to you in error, no action is required.</p>
                    <p>For any inquiries, feel free to reach out at <a href="mailto:support@anes-blood-donor.com">support@anes-blood-donor.com</a>.</p>
                    <p>Warm regards,</p>
                    <p><strong>ANES Blood Donation Team</strong></p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully');
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
};

module.exports = sendEmail;
