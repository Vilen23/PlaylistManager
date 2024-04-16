"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

interface song{
  id: string;
  name: string;
  artist: string;
  release_date: string;
  image: string;
  preview_url: string;

}

export default function ExploreMusic() {
  const [songs, setSongs] = useState<song[]>([]);
  useEffect(() => {
    const getrelease = async () => {
      const res = await axios.get("/api/getnewrelease");
      console.log(res.data);
      setSongs(res.data.items);
    };
    getrelease();
  }, []);

  
  return (
    <div className="flex justify-center mt-20 flex-col items-center">
      <h1 className="text-[60px] font-bold ">Explore New Music</h1>
      <div >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Song</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Listen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {songs.map((song) => {
              return (
                <TableRow key={song.id}>

                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
