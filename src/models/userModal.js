import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fistname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null }, // Nullable for social login users
    image: { type: String, default: null }, // Nullable for credentials users
})

const User = mongoose.model.User || mongoose.model("User", userSchema)
export default User;