"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { connectedAtom } from "@/Store/atoms/Connected";
import { Check, CrossIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  spotifyUserAtom,
  spotifyUserTokenAtom,
} from "@/Store/atoms/spotifyuser";
import axios from "axios";
import { getUser, refreshUserToken } from "@/lib/spotify-user";

export default function ConnectMusic() {
  const [connected, setConnected] = useRecoilState(connectedAtom);
  const [spotifyuser, setSpotifyUser] = useRecoilState(spotifyUserAtom);
  const [spotifyUserToken, setSpotifyUserToken] =
    useRecoilState(spotifyUserTokenAtom);
  const router = useRouter();
  const params = useSearchParams();

  // console.log(spotifyUserToken.accessToken);
  // useEffect(() => {
  //   if (!spotifyUserToken.accessToken) {
  //     setConnected({ ...connected, spotify: false });
  //   } else {
  //     setConnected({ ...connected, spotify: true });
  //   }
  // }, [spotifyUserToken]);

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");
    if (code && state) {
      const getUserData = async () => {
        const resposne = await axios.get(
          `/api/spotify/callback/?code=${code}&state=${state}`
        );
        if (resposne.status === 200) {
          setConnected({ ...connected, spotify: true });
          setSpotifyUserToken(resposne.data);
          
        }
      };
      getUserData();
    }
  }, [params]);

  const handleSpotify = async () => {
    if (!connected.spotify) {
      router.push("/api/spotify/connectUser");
    } else {
      const refreshToken = await refreshUserToken(
        spotifyUserToken.refresh_token
      );
      console.log(refreshToken);
      setSpotifyUserToken(refreshToken);
      const user = await getUser({
        accessToken: refreshToken.access_token,
      });
      setSpotifyUser(user);
      router.push("/dashboard");
    }
  };

  if (connected === null) return <div>Loading...</div>;
  return (
    <div className="h-[70vh] w-[100vw] bg-[#111] flex justify-center items-center text-white overflow-x-hidden">
      <div className="flex flex-col gap-3 items-center w-[600px] shadow-2xl py-10  rounded-xl">
        <h1 className="text-4xl font-extrabold">PlayIT</h1>
        <p className="text-center text-xs">
          Connect your favourite music platform to get the enhanced experience
        </p>
        <div className="grid grid-cols-2 gap-4 my-10">
          {connected.spotify ? (
            <div
              onClick={handleSpotify}
              className="flex items-center px-3 gap-2 py-2 cursor-pointer rounded-xl text-white text-xl hover:scale-105 transition-all duration-500"
            >
              <span>
                <Image
                  src="/spotify1.png"
                  alt="spotify"
                  height={40}
                  width={40}
                />
              </span>
              Spotify
              <Check />
            </div>
          ) : (
            <div
              onClick={handleSpotify}
              className="rounded-xl  flex px-3 py-2 gap-2 items-center cursor-pointer text-white text-xl hover:scale-105 transition-all  duration-500"
            >
              <span>
                <Image
                  src="/spotify1.png"
                  alt="spotify"
                  height={40}
                  width={40}
                />
              </span>
              Spotify
            </div>
          )}

          <button className="rounded-xl  flex px-3 py-2 gap-2 items-center  text-xl hover:scale-105 transition-all ease-in-out duration-500">
            <span>
              {" "}
              <Image
                src="/apple.png"
                className="rounded-full"
                alt="applemusic"
                height={40}
                width={40}
              />
            </span>
            Apple Music
          </button>
          <button className="rounded-xl  flex px-3 py-2 gap-2 items-center  text-xl hover:scale-105 transition-all ease-in-out duration-500">
            <span>
              {" "}
              <Image
                src="/ytmusic.png"
                className="rounded-full"
                alt="youtubemusic"
                height={40}
                width={40}
              />
            </span>
            Youtube Music
          </button>
          <button className="rounded-xl  flex px-3 py-2 gap-2 items-center  text-xl hover:scale-105 transition-all ease-in-out duration-500">
            <span>
              {" "}
              <Image
                src="/amazon11.png"
                className="rounded-full"
                alt="youtubemusic"
                height={40}
                width={40}
              />
            </span>
            Amazon Music
          </button>
        </div>
      </div>
    </div>
  );
}
