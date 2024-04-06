import React from "react";
import { Poppins } from "next/font/google";
import AnimatedIcons from "./AnimatedIcons";
const bebas = Poppins({ weight: "800", subsets: ["latin"] });
export default function HeadingHero() {
  return (
    <div className="w-full flex items-center justify-center h-full flex-col">
      <h1 className={`${bebas.className} font-bold md:text-[58px] text-4xl text-center`}>
        Discover The Best Music Daily
      </h1>
      <p className={`md:text-sm md:p-0 md:w-[800px] text-center mt-5 px-10 text-xs text-white/70`}>
        Join us on our musical journey as we discover fresh tunes daily,
        exploring a world of new sounds and rhythms. From emerging artists to
        hidden gems, immerse yourself in a diverse array of music that will
        uplift your spirit and expand your musical horizons.{" "}
      </p>
      <AnimatedIcons />
    </div>
  );
}
