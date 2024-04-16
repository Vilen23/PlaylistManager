"use client"
import React, { useEffect } from 'react'
import LoveYourown from '@/components/LoveYourown';
import ExploreMusic from '@/components/ExploreMusic';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadingAtom } from '@/Store/atoms/loadingRelease';
import { newReleaseAtom } from '@/Store/atoms/newRelease';
import axios from 'axios';
export default function page() {
  const [loading,setLoading] = useRecoilState(loadingAtom);
  const [songs,setSongs] = useRecoilState(newReleaseAtom);

  useEffect(() => {
    const getrelease = async () => {
      try {
        const res = await axios.get("/api/getnewrelease");
        console.log(res.data);
        setSongs(res.data.items);
        if(res.data.items.length > 0){
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getrelease();
  },[])

  if(loading) return <div>Loading...</div>
    
  return (
    <div>
        <LoveYourown/>
        <ExploreMusic/>
    </div>
  )
}
