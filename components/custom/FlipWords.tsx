import React from "react"

import { FlipWords } from "../ui/flip-words"

export function FlipWordsDemo() {
  const words = [
    "serene",
    "picturesque",
    "lush",
    "tranquil",
    "breathtaking",
    "cultural",
    "vibrant",
  ] // Updated words

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="font-bold text-xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
        Welcome to
        <FlipWords words={words} /> <br />
        Kamaris Village
      </div>
    </div>
  )
}
