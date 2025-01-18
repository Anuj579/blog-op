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

// To update user profile
export async function PUT(req) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 })
        }

        const authorId = session.user.id

        if (!authorId) {
            return NextResponse.json({ success: false, error: "Author ID not found" }, { status: 400 })
        }

        const body = await req.json()
        const { firstname, lastname, image } = body;

        if (!firstname && !lastname) {
            return NextResponse.json({ success: false, error: "No updates provided" }, { status: 400 });
        }

        // Prepare the update object
        const updatedFields = {};
        if (firstname) updatedFields.firstname = firstname;
        if (lastname) updatedFields.lastname = lastname;
        
        if (image !== undefined) {
            updatedFields.image = image; // This allows null to be set as a valid value
        }

        // Update the user document
        const updatedUser = await User.findByIdAndUpdate(authorId, updatedFields, { new: true })
        if (!updatedUser) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}