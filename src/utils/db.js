import mongoose from "mongoose";

export async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        console.log('DB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connected');
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }
}