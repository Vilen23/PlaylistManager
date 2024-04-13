import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    console.log(token)
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const userInfo = await result.json();
    return NextResponse.json({ user: userInfo });
  } catch (error) {
    console.log(error);
  }
};
