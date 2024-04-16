"use client"
import Image from "next/image";
import React from "react";
import { Meteors } from "./ui/meteors";
import { motion } from "framer-motion";

export default function LoveYourown() {
  return (
    <div className="flex justify-center items-center mt-10 ">
      {/* <div className={`text-[100px] font-semibold`}>LOVE YOUR</div> */}
      <motion.div 
      viewport={{ once: true, amount: 0.5 }}
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 25 }}
      transition={{duration:1,type:'spring',stiffness:100,damping:20}}
      className="center z-0">
        <h2
          className="center-text glitch is-glitching font-semibold"
          data-text="LOVE YOUR"
        >
          LOVE <span>YOUR</span>
        </h2>
      </motion.div>
      <motion.div 
      viewport={{ once: true, amount: 0.5 }}
      initial={{ opacity: 0, y: -200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{duration:1,type:'spring',stiffness:100,damping:20}}
      className="z-10">
        <Image
          src="/LoveYourOwnTaste.jpeg"
          width={400}
          height={400}
          alt="img"
          className=" shadow-xl shadow-black "
        />
      </motion.div>
      <motion.div
      viewport={{ once: true, amount: 0.5 }}
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: -25 }}
      transition={{duration:1,type:'spring',stiffness:100,damping:20}}
      className="center z-0">
        <h2
          className="center-text glitch is-glitching font-semibold"
          data-text="OWN TASTE"
        >
          OWN <span>TASTE</span>
        </h2>
      </motion.div>
      <Meteors number={30}></Meteors>
    </div>
  );
}
