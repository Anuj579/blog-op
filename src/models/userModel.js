import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, default: null }, // Nullable for social login users
        image: { type: String, default: null }, // Nullable for credentials users
        googleId: { type: String, unique: true, sparse: true },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;