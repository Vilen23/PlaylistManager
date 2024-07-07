"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoveYourown from "@/components/LoveYourown";
import ExploreMusic from "@/components/ExploreMusic";
import { useRecoilState } from "recoil";
import { loadingAtom } from "@/Store/atoms/loadingRelease";
import { newReleaseAtom } from "@/Store/atoms/newRelease";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export default function page() {
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [songs, setSongs] = useRecoilState(newReleaseAtom);
  const [offset,setOffset] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const getrelease = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/getnewrelease?offset="+offset+"&limit=20");
        console.log(res.data);
        setSongs(res.data.items);
        if (res.data.items.length > 0) {
          setLoading(false);
          setOffset(res.data.offset);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getrelease();
  }, [offset]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <LoveYourown />
      <ExploreMusic/>
     <div className="mb-10">
     <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={()=>{
              if(offset==0){
                setOffset(80);
              }else setOffset(offset-20);
            }}/>
          </PaginationItem>
          <PaginationEllipsis>

          </PaginationEllipsis>
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={()=>{
              if(offset==80){
                setOffset(0);
              }else{
                setOffset(offset+20);
              }
            }}/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
     </div>
    </div>
  );
}
