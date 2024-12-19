import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();

        const author  = req.url.split('author=')[1];  // Get the author ID from the query string
        
        if (!author) {
            return NextResponse.json({ success: false, error: "Author ID is required" }, { status: 400 });
        }

        const blogs = await Blog.find({ author }).populate("author", "firstname lastname email").sort({ createdAt: -1 });

        return NextResponse.json({ success: true, blogs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
