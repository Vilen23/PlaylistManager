import React from 'react'
import { AnimatedTooltip } from './ui/animated-tooltip'


const data = [
    {
        id:1,
        name:"Youtube Music",
        image:"/ytmusic.png",
    },
    {
        id:2,
        name:"Spotify",
        image:"/spotify.png",
    },
    
    {
        id:3,
        name:"Apple Music",
        image:"/apple-music.png",
    }
]

export default function AnimatedIcons() {
  return (
    <div className='w-full mt-5 md:mt-20  flex justify-center'>
        <AnimatedTooltip items={data}/>
    </div>
  )
}
