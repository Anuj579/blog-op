import nodemailer from 'nodemailer';

export async function sendDeleteConfirmationEmail(toEmail, confirmationUrl) {
    // Create Nodemailer transporter using your SMTP credentials
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // For Gmail, you can use Gmail's SMTP server
        port: 465, // 465 for secure, 587 for non-secure
        secure: true, // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER, // Your email
            pass: process.env.SMTP_PASS, // Your email password or app-specific password
        },
    });

    // Set up email data
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: toEmail,
        subject: 'Confirm Account Deletion',
        text: `Click the link below to confirm your account deletion: ${confirmationUrl}`,
        html: `<p>Click the link below to confirm your account deletion:</p>
               <a href="${confirmationUrl}">Confirm Deletion</a>`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}
