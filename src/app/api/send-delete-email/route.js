import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { connectDB } from '@/utils/db';
import User from '@/models/userModel';
import ConfirmationToken from '@/models/confirmationTokenModel';
import { sendDeleteConfirmationEmail } from '@/utils/sendEmail';

export async function POST(req) {
    try {
        await connectDB();

        const { email } = await req.json();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // Generate token and expiration time
        const token = nanoid();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Token valid for 10 minutes

        // Save token to the database
        await ConfirmationToken.create({
            userId: user._id,
            token,
            expiresAt,
        });

        // Construct confirmation URL
        const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/delete-account/${token}`;

        // Send email
        await sendDeleteConfirmationEmail(email, confirmationUrl);

        return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending delete confirmation email:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
