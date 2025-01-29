import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ success: true, message: "Server is awake" }, { status: 200 });
}
