import Image from 'next/image'
import React from 'react'
import { Meteors } from './ui/meteors'

export default function LoveYourown() {
  return (
    <div className='flex justify-center items-center mt-10'>
        <div className={`text-[100px] font-semibold`}>LOVE YOUR</div>
        <div>
            <Image src="/LoveYourOwnTaste.jpeg" width={400} height={400} alt='img' className=' shadow-xl shadow-black'/>
        </div>
        <div className='text-[100px] font-semibold'>OWN TASTE</div>
        <Meteors number={30}></Meteors>
    </div>
  )
}
