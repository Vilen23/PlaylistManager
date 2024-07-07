import axios from "axios";

export const getPlaylist = async (id: string, access_token: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
