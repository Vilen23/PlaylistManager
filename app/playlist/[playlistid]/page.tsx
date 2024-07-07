"use client";
import PlaylistSongs from "@/components/PlaylistSongs";
import { getPlaylist } from "@/lib/spotify-playlist";
import { playlistsongAtom } from "@/Store/atoms/playlist";
import { spotifyUserTokenAtom } from "@/Store/atoms/spotifyuser";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface paramsProps {
  playlistid: string;
  [key: string]: string;
}

export default function Page() {
  const params = useParams<paramsProps>();
  const userToken = useRecoilValue(spotifyUserTokenAtom);
  const setPlaylist = useSetRecoilState(playlistsongAtom);

  useEffect(() => {
    if (userToken) {
      const fetchPlaylist = async () => {
        const response = await getPlaylist(
          params.playlistid,
          userToken.access_token
        );
        setPlaylist(response);
      };
      fetchPlaylist();
    }
  }, []);

  return <div>
    <PlaylistSongs/>
  </div>;
}
