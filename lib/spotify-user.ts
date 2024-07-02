import axios from "axios";
import { headers } from "next/headers";

export const getUser = async ({ accessToken }: { accessToken: string }) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {}
};

export const refreshUserToken = async (refreshToken: string) => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const clientId = process.env.SPOTIFY_CLIENT_ID ;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const getNewToken = await axios.post(
      url,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
        },
      }
    );
    console.log(getNewToken.data);
    return getNewToken.data;
  } catch (error) {
    console.log(error);
  }
};
