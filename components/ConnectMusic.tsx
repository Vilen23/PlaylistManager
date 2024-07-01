"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { connectedAtom } from "@/Store/atoms/Connected";
import { Check, CrossIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { spotifyUserAtom } from "@/Store/atoms/spotifyuser";
import axios from "axios";

export default function ConnectMusic() {
  const [connected, setConnected] = useRecoilState(connectedAtom);
  const [spotifyuser, setSpotifyUser] = useRecoilState(spotifyUserAtom);
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");
    if (code && state) {
      const getUserData = async () => {
        const resposne = await axios.get(`/api/spotify/callback/?code=${code}&state=${state}`);
        console.log(resposne);
        window.location.href = "/ConnectMusic"
      };
      getUserData();
    }
  }, [params]);

  const handleSpotify = async () => {
    if (!connected.spotify) {
      const response = router.push("/api/spotify/connectUser");

      console.log(response);
    } else {
      router.push("/dashboard");
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
