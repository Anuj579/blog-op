import Blog from "@/models/blogModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

// GET: Fetch blog details
export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ success: false, error: "Blog ID is required" }, { status: 400 });
        }

        const blog = await Blog.findById(id).populate("author", "firstname lastname email image");
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT: Update blog details
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ success: false, error: "Blog ID is required" }, { status: 400 });
        }

        const body = await req.json();
        const { title, content, coverImage } = body;

        if (!title && !content) {
            return NextResponse.json({ success: false, error: "No updates provided" }, { status: 400 });
        }

        // Prepare the update object
        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (content) {
            updatedFields.content = content;

            // Recalculate read time if content is updated
            const words = content.split(" ").length;
            const readTime = Math.ceil(words / 200); // Approx. 200 words per minute
            updatedFields.readTime = readTime;
        }
        if (coverImage) updatedFields.coverImage = coverImage;

        // Update the blog in the database
        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedBlog) {
            return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, blog: updatedBlog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Delete blog
export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ success: false, error: "Blog ID is required" }, { status: 400 });
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
