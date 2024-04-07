import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  var code = searchParams.get("code") || null;
  var state = searchParams.get("state") || null;

  if (state === null) {
    return NextResponse.redirect("/api/spotify/login");
  }
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    json: true,
  };
  try {
    const response = await axios.post(authOptions.url, authOptions.form, {
      headers: authOptions.headers,
    });
    const token = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    const cookieOptions = {
      httpOnly: true,
    };
    cookies().set("spotify_token", token, cookieOptions);
    cookies().set("spotify_refresh_token", refreshToken, cookieOptions);
    return NextResponse.redirect("http://localhost:3000/");
  } catch (error) {
    console.error("Error in tokens", error);
    return new NextResponse("ERROR", { status: 500 });
  }
};
