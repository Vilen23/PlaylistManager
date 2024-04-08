"use client";
import React, { useEffect } from "react";
import { Oswald } from "next/font/google";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { connectedAtom } from "@/Store/atoms/Connected";
import { Check, Cross } from "lucide-react";
import { useCookies } from "next-client-cookies";
const oswald = Oswald({ weight: "600", subsets: ["latin"] });

export default function ConnectMusic() {
  const [connected, setConnected] = useRecoilState(connectedAtom);
    const cookies = useCookies();
  useEffect(() => {
    const spotifyToken = cookies.get("spotify_token");
    console.log(spotifyToken);
    if (spotifyToken) {
      setConnected((prev) => ({ ...prev, spotify: true }));
    } else {
      setConnected((prev) => ({ ...prev, spotify: false }));
    }
  }, []);
  const handleSpotify = () => {
    try {
      window.location.href = "/api/spotify/login";
      setConnected((prev) => ({ ...prev, spotify: true }));
    } catch (error) {
      console.log(error);
      setConnected((prev) => ({ ...prev, spotify: false }));
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
            <span>{connected.spotify ? "con" : <Cross />}</span>
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
