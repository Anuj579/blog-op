import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        // Calculate read time (approx. 200 words per minute)
        const words = body.content.split(" ").length;
        const readTime = Math.ceil(words / 200);

        // Create a new blog with calculated read time and initialize comments
        const blog = new Blog({
            ...body,
            readTime, // Set calculated read time
            comments: [], // Initialize empty comments
        });

        await blog.save();

        return NextResponse.json({ success: true, blog }, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
