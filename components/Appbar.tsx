"use client";
import React from "react";
import { Oswald } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, Music2Icon, Music3Icon } from "lucide-react";

const rubic = Oswald({ weight: "600", subsets: ["latin"] });

export default  function Appbar() {
  const session = useSession();
  const router = useRouter();
  const handleClick = () => {
    if (session?.data?.user) {
      return null;
    } else {
      router.push("/signin");
    }
  };

  const handleConnect = ()=>{
    if(session?.data?.user){
      router.push("/ConnectMusic")
    }else{
      router.push("/signin")
    }
  }
  // const handleConnect = ()=>{
  //     router.push("/ConnectMusic")
  // }

  return (
    <div className=" px-5 md:px-40">
      <div className="w-full h-[80px] md:h-[120px] bg-transparent border-b border-white px-5 md:px-20  text-white flex justify-between items-center">
        <h1 onClick={()=>{
          router.push("/")
        }} className={`${rubic.className} text-white font-extrabold  text-3xl md:text-5xl flex cursor-pointer`}>
          PlayIT <span className="text-[#39FF14]"><Music2Icon/></span>
        </h1>

        <nav className="hidden md:flex">
          <ul className="flex gap-10 text-xl">
            <li onClick={()=>{
              router.push("/")
            }} className="hover:text-[#39FF14] hover:scale-110 transition-all ease-in-out cursor-pointer">
              Convert Playlist
            </li>
            <li onClick={()=>{
              router.push("/newReleases")
            }} className="hover:text-[#39FF14] hover:scale-110 transition-all ease-in-out cursor-pointer">
              Find new Music
            </li>
            <li className="hover:text-[#39FF14] hover:scale-110 transition-all ease-in-out cursor-pointer">
              Your Playlists
            </li>
            <li onClick={handleConnect} className="hover:text-[#39FF14] flex hover:scale-110 items-center transition-all ease-in-out cursor-pointer">
              Connect your <span className="text-[#39FF14] "><Music2Icon height={20}/></span>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          
          
          <button
            onClick={handleClick}
            className={`${session.data?.user ?" flex items-center justify-between gap-4 px-6 py-3 rounded-md text-sm":"flex items-center justify-between gap-4 px-6 py-3  rounded-md hover:scale-110  bg-[#111] text-white text-2xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-green-500 transition duration-200"}`}
          >
            {session?.data?.user?.image && (
            <span>
              <Image
                src={session?.data?.user?.image ?? ""}
                width={40}
                height={40}
                className="rounded-full"
                alt="img"
              />
            </span>
          )}
            {session?.data?.user ? session.data.user.name : "Login"}
          </button>
          {session?.data?.user && (
            <div onClick={()=>signOut()} className="cursor-pointer text-[#39FF14] hover:scale-110">
              <LogOut/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
