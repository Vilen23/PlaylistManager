"use client"
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import axios from 'axios';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { songAtom } from '@/Store/atoms/songs';
import { Oswald } from 'next/font/google';
const oswald = Oswald({ weight: "600", subsets: ["latin"] });
const oswald1 = Oswald({ weight: "500", subsets: ["latin"] });

export default function CrouselAlbumCover() {
    const [songs,setSongs] = useState([]);
    const [listsongs,setListsongs] = useRecoilState(songAtom);
    
    useEffect(()=>{
        try {
            const fetchSongs = async ()=>{
                const response = await axios.get("/api/spotify-token");
                setSongs(response.data)
                console.log(response.data[0].track)
            }
            fetchSongs();

        } catch (error) {
            console.log(error);
            return;
        }
    },[])

  return (
    <div className='w-full flex items-center justify-center'>
            <Carousel className="w-full max-w-[300px] md:max-w-[400px]">
        <CarouselContent>
            {songs.map((song: any, index: number) => (
                <CarouselItem key={index}>
                    <div className="p-1 rounded-xl shadow-lg cursor-pointer ">
                        <Image src={song.track.album.images[1].url} alt='hi' width={400} height={400}/>
                    </div>
                    <div className='flex flex-col pl-2  w-full'>
                        <p className={` ${oswald.className} pt-1 text-2xl font-bold cursor-pointer hover:underline`}>{song.track.name}</p>
                        <p className={`${oswald1.className} text-xs font-light text-white/70 pl-1 cursor-pointer hover:underline`}>{song.track.artists[0].name}</p>
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
    </div>
  )
}
