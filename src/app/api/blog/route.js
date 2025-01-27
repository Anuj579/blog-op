import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

// This is for getting the current user blogs

export async function GET(req) {
    try {
        await connectDB();

        const url = new URL(req.url);
        const author = url.searchParams.get('author');

        if (!author) {
            return NextResponse.json({ success: false, error: "Author ID is required" }, { status: 400 });
        }

        const blogs = await Blog.find({ author: author }).populate("author", "firstname lastname email").sort({ createdAt: -1 });

        return NextResponse.json({ success: true, blogs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
