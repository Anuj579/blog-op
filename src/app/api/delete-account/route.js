import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import ConfirmationToken from '@/models/confirmationTokenModel';
import User from '@/models/userModel';
import Blog from '@/models/blogModel';

export async function POST(req) {
    try {
        await connectDB();
        const { token } = await req.json();

        // Check if token is valid
        const tokenData = await ConfirmationToken.findOne({ token });
        if (!tokenData) {
            return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 400 });
        }

        // Check token expiration
        if (new Date() > tokenData.expiresAt) {
            await ConfirmationToken.findByIdAndDelete(tokenData._id);
            return NextResponse.json({ success: false, error: 'Token has expired' }, { status: 400 });
        }

        const userId = tokenData.userId;

        try {
            // 1. First, remove user's comments from other people's blogs
            await Blog.updateMany(
                { 'comments.user': userId },
                { $pull: { comments: { user: userId } } }
            );

            // 2. Delete all blogs authored by the user
            await Blog.deleteMany({ author: userId });

            // 3. Delete the user
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
            }

            // 4. Remove the token
            await ConfirmationToken.findByIdAndDelete(tokenData._id);

            return NextResponse.json({
                success: true,
                message: 'Account deleted successfully'
            }, { status: 200 });

        } catch (error) {
            console.error('Error during deletion process:', error);
            return NextResponse.json({
                success: false,
                error: 'Failed to delete account and associated data'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Error deleting account:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}