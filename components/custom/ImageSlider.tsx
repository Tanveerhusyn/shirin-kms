"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { ImagesSlider } from "../ui/images-slider"
import { FlipWordsDemo } from "./FlipWords"

export function ImagesSliderDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = ["/HeroOne.jpg", "/main-2.jpg", "/main-1.JPG"]

  const texts = [
    {
      title: "Welcome to Kamaris Village",
      subtitle:
        "Nestled among rolling hills, our village offers breathtaking views and tranquil living.",
    },
    {
      title: "Charming Cobblestone Streets",
      subtitle:
        "Wander through history on our winding lanes, lined with quaint cottages and blooming gardens.",
    },
    {
      title: "Vibrant Local Culture",
      subtitle:
        "Experience the warmth of our community through colorful festivals and time-honored traditions.",
    },
    {
      title: "Nature's Playground",
      subtitle:
        "Surrounded by lush forests and crystal-clear streams, adventure awaits at every turn.",
    },
  ]

  return (
    <ImagesSlider
      className="h-[50rem]"
      images={images}
      texts={texts.map((t) => t.title)}
      onSlideChange={setCurrentIndex}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center px-4"
      >
        <FlipWordsDemo />
        <AnimatePresence mode="wait">
          <motion.div
            key={`subtitle-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-4 text-center max-w-3xl"
          >
            <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
              <span>Explore →</span>
              <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
            </button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </ImagesSlider>
  )
}
