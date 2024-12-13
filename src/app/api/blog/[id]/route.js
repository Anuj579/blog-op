import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    try {
        await connectDB();
        const blog = await Blog.findById(id).populate("author", "firstname lastname email image"); // Optional: Populate author details
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, blog }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

}