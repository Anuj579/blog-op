import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    try {
        await connectDB()

        // Validate user session
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params; //blog ID
        const { content } = await req.json(); // get comment content from the request

        if (!content || content.trim() === "") {
            return NextResponse.json({ message: "Comment content is required" }, { status: 400 })
        }

        // Find the blog by ID
        const blog = await Blog.findById(id)
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 })
        }

        // Add the comment to the blog
        blog.comments.push({
            user: session.user.id,
            content,
        })

        await blog.save();

        const blogWithUserData = await Blog.findById(id).populate({
            path: 'comments.user',
            select: 'firstname lastname image'
        }).lean()

        return NextResponse.json({ message: "Comment added successfully", comment: blogWithUserData.comments }, { status: 201 })
    } catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}