"use client"

import React, { useState } from "react"
import Image from "next/image"
import { MapProvider } from "@/providers/map-provider"

import { MapComponent } from "./map"

const SeasonalImages = () => {
  const [selectedSeason, setSelectedSeason] = useState("spring")

  const seasonImages = {
    spring: "/HeroOne.jpg",
    summer: "/main-1.JPG",
    autumn: "/autumn-village.jpg",
    winter: "/winter-village.jpg",
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={seasonImages[selectedSeason]}
        alt={`Village in ${selectedSeason}`}
        layout="fill"
        objectFit="cover"
        className="rounded-xl"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black to-transparent rounded-xl">
        <p className="text-white text-xl mb-4">
          Experience our village in every season
        </p>
        <div className="flex space-x-2">
          {Object.keys(seasonImages).map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-3 py-1 rounded-full text-xs ${
                selectedSeason === season
                  ? "bg-white text-black"
                  : "bg-black bg-opacity-50 text-white hover:bg-opacity-75"
              }`}
            >
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const VillageMapSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            Explore Our Village
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-2xl mt-2 mx-auto">
            Discover the charm and layout of Shirin Kamaris through our
            interactive map. Navigate through our streets, find key landmarks,
            and get a bird's-eye view of our beautiful village in all seasons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 h-[400px] lg:h-[600px]">
              <MapProvider>
                <MapComponent />
              </MapProvider>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 h-[400px] lg:h-[600px]">
              <SeasonalImages />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Use the map to explore our village's layout, find points of
            interest, and plan your visit. Click on markers to learn more about
            specific locations. The seasonal images showcase our village's
            beauty throughout the year.
          </p>
        </div>
      </div>
    </section>
  )
}

export default VillageMapSection
