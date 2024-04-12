"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { spotifyUserAtom } from "@/Store/atoms/spotifyuser";
import { HoverCard, HoverCardContent } from "./ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";

export default function SpotifyHeader() {
  const spotifyUser = useRecoilValue(spotifyUserAtom);
  const [hover, setHover] = useState(false);
  // console.log(spotifyUser.user);
  return (
    <div className="w-[100vw] px-40">
      <div className=" h-[80px] flex items-center justify-between px-10">
        <div className="flex items-center justify-center gap-4 ">
          <Image
            onClick={() => {
              window.open(spotifyUser.user.external_urls.spotify);
            }}
            src={spotifyUser.user.images[0].url}
            alt="imageuser"
            height={40}
            width={40}
            className="rounded-full cursor-pointer hover:scale-110 transition-all ease-in-out duration-500"
          />
          <div className="relative">
            <p
              onClick={() => {
                window.open(spotifyUser.user.external_urls.spotify);
              }}
              className="text-2xl font-semibold w-fit hover:underline cursor-pointer"
            >
              {spotifyUser.user.display_name}
            </p>
            <p className={`text-[10px] text-[#39FF14] absolute left-5 `}>
              {spotifyUser.user.product}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-white/80">6 followers</p>
          </div>
        </div>
        <div>
          <HoverCard>
            <HoverCardTrigger className="text-xl text-[#39FF14] cursor-pointer">Email</HoverCardTrigger>
            <HoverCardContent className="text-sm bg-[#111] border-[1px] ">{spotifyUser.user.email}</HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}
