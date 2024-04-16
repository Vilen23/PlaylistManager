"use client"
import React from "react";
import {
  TextRevealCard
} from "./ui/text-reveal-card";
import CrouselAlbumCover from "./CrouselAlbumCover";
import HeadingHero from "./HeadingHero";
import { useRecoilValue } from "recoil";
import { loadingHeroAtom } from "@/Store/atoms/loadingHero";

export default function HeroSection() {
  const loading =  useRecoilValue(loadingHeroAtom);
  return (
    <div>
      <div className=" items-center justify-center bg-[#111] rounded-2xl w-[full] sm:flex hidden overflow-x-hidden">
        <TextRevealCard
          text="Add vibe to your song"
          revealText="Love your own taste"
          className="bg-[#111]"
        ></TextRevealCard>
      </div>
      <div className="flex flex-col mt-10 md:mt-0 gap-20 md:gap-0 md:flex-row  items-center ">
        <HeadingHero />
        <CrouselAlbumCover />
      </div>
    </div>
  );
}
