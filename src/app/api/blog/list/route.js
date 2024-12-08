import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB()

        const blogs = await Blog.find({}).populate("author", "name email").sort({ createdAt: -1 })
        return NextResponse.json({ success: true, blogs }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}