"use client";
import {
  spotifyUserAtom,
  spotifyUserPlaylistsAtom,
  spotifyUserTokenAtom,
} from "@/Store/atoms/spotifyuser";
import { getUsersPlaylist } from "@/lib/spotify-user";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PlaylistCard from "./ui/PlaylistCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getPlaylist } from "@/lib/spotify-playlist";
export default function SpotifyUserDashboard() {
  const [usersplaylist, setUsersplaylist] = useRecoilState(
    spotifyUserPlaylistsAtom
  );
  const userProfile = useRecoilValue(spotifyUserAtom);
  const usersToken = useRecoilValue(spotifyUserTokenAtom);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userProfile.id && usersToken.access_token) {
      const fetchPlaylist = async () => {
        const playlist = await getUsersPlaylist({
          id: userProfile.id,
          access_token: usersToken.access_token,
        });
        setUsersplaylist(playlist);
        setIsLoaded(true);
      };
      fetchPlaylist();
    }
  }, [userProfile, usersToken]);

  const handlePlaylistClick = async (id:string,href:string) => {
    router.push(`/playlist/${id}`);
  };

  return (
    <div className="w-full  flex justify-center mt-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="font-semibold text-3xl">Your Playlists</h2>
        <div className="flex flex-wrap gap-10">
          {isLoaded &&
            usersplaylist.items.map((playlist: any) => (
              <div onClick={()=>{handlePlaylistClick(playlist.id,playlist.href)}}>
                <PlaylistCard
                  key={playlist.id}
                  id={playlist.id}
                  image={
                    playlist.images.length > 1
                      ? playlist.images[1].url
                      : playlist.images[0].url
                  }
                  name={playlist.name}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
