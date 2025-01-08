import { getServerSession } from "next-auth";
import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
    try {

        // Use getServerSession to fetch the session on the server-side
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "User not authenticated" }),
                { status: 401 }
            );
        }

        await connectDB();

        // Get the total blogs for the user
        const totalBlogs = await Blog.countDocuments({ author: session.user.id });

        // Get the total comments for the user
        const blogs = await Blog.find({ author: session.user.id });
        const totalComments = blogs.reduce((sum, blog) => sum + blog.comments.length, 0);

        return new NextResponse(
            JSON.stringify({
                success: true,
                totalBlogs,
                totalComments: totalComments || 0,
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
