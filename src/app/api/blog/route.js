import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// This is for getting the current user blogs

export async function GET(req) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "User not authenticated" }),
                { status: 401 }
            );
        }

        const author = session.user.id

        if (!author) {
            return NextResponse.json({ success: false, error: "Author ID not found" }, { status: 400 })
        }

        const blogs = await Blog.find({ author: author }).populate("author", "firstname lastname email").sort({ createdAt: -1 });

        return NextResponse.json({ success: true, blogs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
