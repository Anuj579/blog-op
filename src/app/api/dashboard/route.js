import { getServerSession } from "next-auth";
import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";  // Make sure to import authOptions

export async function GET(req) {
    try {

        // Use getServerSession to fetch the session on the server-side
        const session = await getServerSession(authOptions);
        console.log("Session:", session);

        if (!session) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "User not authenticated" }),
                { status: 401 }
            );
        }

        await connectDB();

        // Get the total blogs for the user
        const totalBlogs = await Blog.countDocuments({ author: session.user.id });
        const totalComments = await Blog.aggregate([
            { $match: { author: session.user.id } }, // Filter blogs where the author is the user
            { $unwind: "$comments" },    // Flatten the comments array so each comment is a separate document
            { $group: { _id: null, totalComments: { $sum: 1 } } },  // Count the total number of comments
        ]);

        return new NextResponse(
            JSON.stringify({
                success: true,
                totalBlogs,
                totalComments: totalComments[0]?.totalComments || 0,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in dashboard API:", error);
        return new NextResponse(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
}
