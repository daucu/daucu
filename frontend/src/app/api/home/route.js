import { NextResponse } from "next/server";

// Get Request
export async function GET() {
  
  return NextResponse.json({ message: "Home Page" });
}
