import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const refreshToken = req.cookies.get("spotify_refresh_token");
  console.log(refreshToken);
const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
            "Basic " +
            Buffer.from(
                process.env.SPOTIFY_CLIENT_ID +
                    ":" +
                    process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
    },
    form:({
        grant_type: "refresh_token",
        refresh_token: refreshToken?.value ,
    }),
};

  try {
    const response = await axios.post(authOptions.url, authOptions.form, {
      headers: authOptions.headers,
    });
    cookies().delete("spotify_token");
    cookies().set("spotify_token", response.data.access_token,{httpOnly:true} );

    return NextResponse.json({ok:"ok"}, { status: 200 });
  } catch (error) {
    // console.error("Error refreshing token:", error);
    return new NextResponse("Error refreshing token", { status: 500 });
  }
};
