import mongoose from "mongoose";

let isConnected = false; // Track connection status

export async function connectDB() {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('DB connected successfully');
    } catch (error) {
        console.error('Error connecting to DB:', error);
        throw new Error("Database connection failed");
    }
}
