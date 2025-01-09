import User from "@/models/userModel";
import { connectDB } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "User not authenticated" }),
                { status: 401 }
            );
        }

        const author = session.user.id

        if (!author) {
            return NextResponse.json({ success: false, error: "Author ID not found" }, { status: 400 })
        }

        const user = await User.findById(author)

        if (!user) {
            return NextResponse.json({ success: false, error: "No user found" }, { status: 404 })
        }

        // Structure the response to exclude sensitive data
        const { firstname, lastname, email, image, createdAt } = user;
        return NextResponse.json(
            {
                success: true,
                user: { firstname, lastname, email, image, createdAt },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}