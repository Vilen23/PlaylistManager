import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const authToken = req.cookies.get("spotify_token");
  if (!authToken) {
    return NextResponse.redirect("/api/spotify/login");
  }
  const val = authToken.value;
  try {
    const spotifyres = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + val,
      },
    });
    if (spotifyres.data) {
      return NextResponse.json({ user: spotifyres.data }, { status: 200 });
    } else {
      return NextResponse.json({ user: null }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("ERROR", { status: 500 });
  }
};
