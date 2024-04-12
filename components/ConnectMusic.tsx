"use client";
import React from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { connectedAtom } from "@/Store/atoms/Connected";
import { Check, CrossIcon } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { spotifyUserAtom } from "@/Store/atoms/spotifyuser";
import {setCookie , getCookies} from "cookies-next"


export default function ConnectMusic() {
  const [connected, setConnected] = useRecoilState(connectedAtom);
  const [spotifyuser, setSpotifyUser] = useRecoilState(spotifyUserAtom);
  const router = useRouter();
  console.log(connected.spotify)
  const handleSpotify = () => {
    try {
      if (connected.spotify) {
        const getuser = async () => {
          const response = await axios.get("/api/spotify/refresh_token");
          setCookie("spotify_token",response.data.token)
          const res = await axios.get("/api/spotify/getuser");
          console.log(res)
          setSpotifyUser(res.data);
          router.push("/dashboard");
          setConnected((prev) => ({ ...prev, spotify: true }));
        };
        getuser();
      } else {
        setConnected((prev) => ({ ...prev, spotify: true }));
        console.log(connected.spotify)
        window.location.href = "/api/spotify/login";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setConnected((prev) => ({ ...prev, spotify: true }));
    }
  };


  return (
    <div className="h-[70vh] w-[100vw] bg-[#111] flex justify-center items-center text-white overflow-x-hidden">
      <div className="flex flex-col gap-3 items-center w-[600px] shadow-2xl py-10  rounded-xl">
        <h1 className="text-4xl font-extrabold">PlayIT</h1>
        <p className="text-center text-xs">
          Connect your favourite music platform to get the enhanced experience
        </p>
        <div className="grid grid-cols-2 gap-4 my-10">
          <button
            onClick={handleSpotify}
            className="rounded-xl  flex px-3 py-2 gap-2 items-center text-white text-xl hover:scale-105 transition-all ease-in-out duration-500"
          >
            <span>
              <Image src="/spotify1.png" alt="spotify" height={40} width={40} />
            </span>
            Spotify
            <span>{connected.spotify ? <CrossIcon /> : <Check />}</span>
          </button>
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
