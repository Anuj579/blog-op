import { connectDB } from '@/utils/db';
import ConfirmationToken from '@/models/confirmationTokenModel';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');  // Get the token from the URL query

    if (!token) {
        return new Response(JSON.stringify({ message: 'Token is required' }), { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Find the token in the database
    const tokenDoc = await ConfirmationToken.findOne({ token });

    if (!tokenDoc) {
        return new Response(JSON.stringify({ isExpired: true, message: 'Token not found' }), { status: 404 });
    }

    // Check if the token has expired
    const isExpired = tokenDoc.expiresAt < new Date();

    return new Response(JSON.stringify({ isExpired }), { status: 200 });
}
