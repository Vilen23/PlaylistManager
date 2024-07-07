import axios from "axios";

export const getUser = async ({ access_token }: { access_token: string }) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

export const refreshUserToken = async (refresh_token: string) => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
    const getNewToken = await axios.post(
      url,
      {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
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
    return getNewToken.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersPlaylist = async ({
  id,
  access_token,
}: {
  id: string;
  access_token: string;
}) => {
  try {
    const url = `https://api.spotify.com/v1/users/${id}/playlists`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
