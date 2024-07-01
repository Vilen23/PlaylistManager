import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

console.log(code,state);
  if (state === null) {
    return new NextResponse("No state given", { status: 409 });
  } else {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    var authOptions: {
      url: string;
      form: {
        code: string | null;
        redirect_uri: string;
        grant_type: string;
      };
      headers: {
        "content-type": string;
        Authorization: string;
      };
      json: boolean;
    } = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: "http://localhost:3000/ConnectMusic",
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
    try {
      const response = await axios.post(authOptions.url, authOptions.form, {
        headers: authOptions.headers,
      });
      console.log(response);
      if (response.status === 200) {
        return NextResponse.json(response.data, { status: 200 });
      }
    } catch (error) {
      console.log(error);
      return new NextResponse("Something happened so Error", { status: 500 });
    }
  }
};
