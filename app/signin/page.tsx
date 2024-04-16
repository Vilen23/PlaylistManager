"use client"
import Signin from '@/components/Signin'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function () {
  const session = useSession();
  const router = useRouter();
  useEffect(()=>{
    if(session?.data?.user){
      router.push("/")
    }
  },[session])
  return (
    <div>
      <Signin/>
    </div>
  )
}

