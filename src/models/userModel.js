import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, default: null }, // Nullable for social login users
        image: { type: String, default: null }, // Nullable for credentials users
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
)

// Middleware for cascade deletion of blogs and comments
userSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    const userId = this._id;

    try {
        // Delete all blogs authored by the user
        await Blog.deleteMany({ author: userId });

        // Remove the user's comments from all blogs
        await Blog.updateMany({}, { $pull: { comments: { user: userId } } });

        next();
    } catch (error) {
        next(error); // Pass any error to the middleware chain
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;