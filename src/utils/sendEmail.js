import nodemailer from 'nodemailer';

export async function sendDeleteConfirmationEmail(toEmail, confirmationUrl) {
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const blogAppName = "BlogApp"

    // Email options
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: toEmail,
        subject: `Confirm Account Deletion - ${blogAppName}`,
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>You recently requested to delete your account on <strong>${blogAppName}</strong>.</p>
            <p>Click the button below to confirm your account deletion. This link will expire in <strong>10 minutes</strong>:</p>
            <a href="${confirmationUrl}" style="display: inline-block; color: #ffffff; background-color: #007bff; text-decoration: none; font-weight: bold; padding: 10px 15px; border-radius: 5px;">Confirm Deletion</a>
            <p style="margin-top: 15px;">If you did not request this, you can safely ignore this email.</p>
        </div>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}
