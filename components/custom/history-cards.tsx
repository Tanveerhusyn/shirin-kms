"use client"

import React from "react"
import Image from "next/image"

import { Card, Carousel } from "../ui/apple-cards-carousel"

export default function HistoryCards() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ))
  return (
    <div id="about" className="w-full h-full py-20">
      <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
        Discover Our Charming Village
      </h2>
      <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
        Explore our interactive village map. Click on areas to learn more about
        our community!
      </p>

      <Carousel items={cards} />
    </div>
  )
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Our village has a rich history dating back centuries.
              </span>{" "}
              From ancient traditions to modern developments, our community has
              evolved while maintaining its unique character. Explore our
              heritage sites, taste our local cuisine, and immerse yourself in
              our vibrant culture.
            </p>
            <Image
              src="/api/placeholder/500/500"
              alt="Village scenery placeholder"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        )
      })}
    </>
  )
}

const data = [
  {
    category: "History",
    title: "Our Village Through the Ages",
    src: "/main-1.JPG",
    content: <DummyContent />,
  },
  {
    category: "Culture",
    title: "Traditions and Festivals",
    src: "/main-2.jpg",
    content: <DummyContent />,
  },
  {
    category: "Landmarks",
    title: "Must-Visit Places",
    src: "/main-3.jpg",
    content: <DummyContent />,
  },
  {
    category: "Local Cuisine",
    title: "Taste of Our Village",
    src: "/main-4.jpg",
    content: <DummyContent />,
  },
  {
    category: "Nature",
    title: "Exploring Our Natural Beauty",
    src: "/HeroOne.jpg",
    content: <DummyContent />,
  },
  {
    category: "Community",
    title: "Meet Our People",
    src: "/main.jpg",
    content: <DummyContent />,
  },
]
