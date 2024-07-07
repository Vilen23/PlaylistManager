"use client";
import { playlistsongAtom } from "@/Store/atoms/playlist";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import { ScrollArea } from "./ui/scroll-area";
import { Music2Icon, PlusIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function PlaylistSongs() {
  const playlist = useRecoilValue(playlistsongAtom);
  console.log(playlist);
  return (
    <div className="flex h-[70vh] px-[15vw] pt-[10vw] gap-20">
      <ScrollArea className="w-[70%] h-full ">
        {playlist.tracks.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3">
            <div className="flex items-center gap-4 cursor-pointer">
              <Image
                src={item.track.album.images[0].url}
                height={40}
                width={40}
                alt="song_name"
                className="rounded-full"
              ></Image>
              <div>
                <h1 className="">{item.track.name}</h1>
                <h1 className="text-xs font-light">
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </h1>
              </div>
            </div>
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <PlusIcon className="text-sm text-green-500 hover:text-white hover:scale-75 transition-all duration-500 cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    Choose the playlist you want to add this song to
                </DialogContent>
              </Dialog>
              <a href={item.track.preview_url} rel="noreferrer">
                <Music2Icon className="hover:text-green-500 transition-all duration-500" />
              </a>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="w-[30%] h-full flex flex-col justify-center items-center ">
        <img
          src={playlist.images[0].url}
          width={300}
          height={300}
          alt="playlist_image"
          className="shadow-xl rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-5">{playlist.name}</h1>
        <h1 className="text-sm font-light mt-2">
          By {playlist.owner.display_name} - {playlist.followers.total}{" "}
          followers
        </h1>
      </div>
    </div>
  );
}
