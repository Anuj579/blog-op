import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        coverImage: {
            type: String,
            default: null, // URL of the image
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                    trim: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        readTime: {
            type: Number, // Read time in minutes
            default: 0,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
)

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema)
export default Blog;