import Image from "next/image";
import React from "react";

interface PlaylistCardProps {
  image: string;
  name: string;
  id: string;
}

export default function PlaylistCard({ image, name, id }: PlaylistCardProps) {
  return (
    <div className="rounded-xl shadow-lg flex flex-col gap-2 cursor-pointer items-center justify-center" key={id}>
      <img src={image} alt={name} width={200} height={200} className="hover:scale-105 transition-all duration-500 rounded-xl"/>
      <h1 className="font-light hover:text-green-500 transition-all duration-300">{name}</h1>
    </div>
  );
}
