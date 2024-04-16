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
import Image from 'next/image';
import { Oswald } from 'next/font/google';
import { useSetRecoilState } from 'recoil';
import { loadingHeroAtom } from '@/Store/atoms/loadingHero';
const oswald = Oswald({ weight: "600", subsets: ["latin"] });
const oswald1 = Oswald({ weight: "500", subsets: ["latin"] });

export default function CrouselAlbumCover() {
    const [songs,setSongs] = useState([]);
    const setLoading = useSetRecoilState(loadingHeroAtom);
    useEffect(()=>{
        try {
            setLoading(true);
            const fetchSongs = async ()=>{
                const response = await axios.get("/api/spotify-token");
                setSongs(response.data)
                console.log(response.data[0].track)
            }
            fetchSongs();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
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
                        <Image src={song.track.album.images[1].url} alt='hi' width={400} height={400} onClick={()=>{
                            window.open(song.track.external_urls.spotify)
                        }}/>
                    </div>
                    <div className='flex flex-col pl-2  w-full'>
                        <p onClick={()=>{
                            window.open(song.track.external_urls.spotify)
                        }} className={` ${oswald.className} pt-1 text-2xl font-bold cursor-pointer hover:underline  w-fit`}>{song.track.name}</p>
                        <p onClick={()=>{
                            window.open(song.track.artists[0].external_urls.spotify)
                        }} className={`${oswald1.className} text-xs font-light text-white/70 pl-1 cursor-pointer hover:underline w-fit`}>{song.track.artists[0].name}</p>
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
