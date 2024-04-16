"use client";
import axios from "axios";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { FaSpotify } from "react-icons/fa";
import { SparklesCore } from "./ui/sparkles";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingAtom } from "@/Store/atoms/loadingRelease";
import { newReleaseAtom } from "@/Store/atoms/newRelease";
const pop = Poppins({ weight: "600", subsets: ["latin"] });
interface song {
  id: string;
  name: string;
  artists: any[];
  release_date: string;
  images: any[];
  external_urls: { spotify: string };
}

export default function ExploreMusic() {
  const songs = useRecoilValue(newReleaseAtom);
  const loading = useRecoilValue(loadingAtom);
  const handleListen = (song: song) => {
    window.open(song.external_urls.spotify);
  };
  const handleArtist = (artist: any) => {
    window.open(artist.external_urls.spotify);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center mt-10 flex-col items-center">
      <motion.div
      viewport={{ once: true, amount: 0.5 }}
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: -70 }}
      transition={{duration:1,type:'spring',stiffness:100,damping:20}}
      className="center z-0">
        <h2
          className="center-text glitch is-glitching "
          data-text="EXPLORE NEW"
        >
          EXPLORE <span>NEW</span>&nbsp;
        </h2>
        <h2
          className="center-text glitch is-glitching"
          data-text="MUSIC"
        >
          <span>MUSIC</span>
        </h2>
      </motion.div>
      <div className="w-[40rem] h-40 relative">
        <motion.div
          viewport={{ once: true, amount: 0.5 }}
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: -70 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] w-3/4 blur-sm"
        />
        <motion.div
          viewport={{ once: true, amount: 0.5 }}
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 ,y:-70 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-3/4"
        />
        <motion.div
          viewport={{ once: true, amount: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: -70 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent h-[5px] w-1/4 blur-sm"
        />
        <motion.div
          viewport={{ once: true, amount: 0.5 }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: -70 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent h-px w-1/4 "
        />
        <motion.div 
        viewport={{ once: true, amount: 0.5 }}
        initial={{ opacity: 0}}
        whileInView={{ opacity: 1, y: -70 }}
        transition={{duration:1,type:'spring',stiffness:100,damping:20}}
        >
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={300}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        </motion.div>
        <div className="absolute inset-0 w-full h-full bg-[#111] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
      <div className="mt-[-40px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className={`${pop.className} text-2xl font-bold uppercase`}
              >
                Songs
              </TableHead>
              <TableHead
                className={`${pop.className} text-2xl font-bold uppercase`}
              >
                Artist
              </TableHead>
              <TableHead
                className={`${pop.className} text-2xl font-bold uppercase`}
              >
                Release Date
              </TableHead>
              <TableHead
                className={`${pop.className} text-2xl font-bold uppercase`}
              >
                Listen
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {songs.map((song:any) => {
              return (
                <TableRow key={song.id}>
                  <TableCell>
                    <motion.div
                      viewport={{ once: true, amount: 0.5 }}
                      initial={{ opacity: 0, x: -200, y: -20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      transition={{
                        duration: 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="flex items-center gap-5"
                    >
                      <Image
                        onClick={() => handleListen(song)}
                        src={song.images[1].url}
                        width={64}
                        height={64}
                        alt="he"
                        className="shadow-xl rounded-xl hover:scale-110 cursor-pointer hover:rounded-[0px] transition-all duration-300 "
                      />
                      <p
                        onClick={() => handleListen(song)}
                        className="text-lg flex items-center text-white/90 hover:underline hover:text-white cursor-pointer"
                      >
                        {song.name}
                      </p>
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div
                      viewport={{ once: true, amount: 0.5 }}
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="flex items-center gap-3"
                    >
                      {song.artists.map((artist:any) => {
                        return (
                          <p
                            onClick={() => handleArtist(artist)}
                            key={artist.id}
                            className="flex items-center text-[15px] hover:underline text-white/70 hover:text-white cursor-pointer"
                          >
                            {artist.name}
                          </p>
                        );
                      })}
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.p
                      viewport={{ once: true, amount: 0.5 }}
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="flex justify-center text-white/70"
                    >
                      {song.release_date}
                    </motion.p>
                  </TableCell>
                  <TableCell>
                    <div
                      onClick={() => handleListen(song)}
                      className="flex justify-center text-4xl hover:text-green-500 cursor-pointer hover:scale-125 transition-all duration-500"
                    >
                      <FaSpotify />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
