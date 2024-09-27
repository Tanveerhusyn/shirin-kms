"use client"

import React, { useState } from "react"
import Image from "next/image"
import { MapProvider } from "@/providers/map-provider"
import {
  Building,
  Bus,
  Calendar,
  Camera,
  Car,
  Compass,
  Home,
  MapPin,
  Mountain,
  Plane,
  Tree,
  Utensils,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { MapComponent } from "@/components/custom/map"

export default function LocationAndVisit() {
  return (
    <div className="bg-white mt-20 dark:bg-neutral-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Discover Shirin Kamaris
      </h1>

      <BentoGrid className="max-w-7xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={cn(
              i === 0 ? "md:col-span-3 md:row-span-2" : "",
              i === 1 ? "md:col-span-2 md:row-span-2" : "",
              i === 3 ? "md:col-span-2" : "",
              i === 8 ? "md:col-span-2" : ""
            )}
          />
        ))}
      </BentoGrid>
    </div>
  )
}

export const SeasonalImages = () => {
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

const items = [
  {
    title: "Seasonal Beauty",
    description: "Experience the charm of our village throughout the year",
    header: <SeasonalImages />,
    icon: <Calendar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Explore Our Location",
    description: "Interactive map of Shirin Kamaris and its surroundings",
    header: (
      <div className="h-[400px] w-full rounded-xl overflow-hidden">
        <MapProvider>
          <MapComponent />
        </MapProvider>
      </div>
    ),
    icon: <MapPin className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Village Address",
    description:
      "123 Shirin Kamaris, Gulmit Gojal, Hunza Valley, Gilgit-Baltistan, Pakistan",
    header: (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-violet-400 to-indigo-400 text-white text-4xl font-bold rounded-xl">
        SK
      </div>
    ),
    icon: <Home className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Coordinates & Elevation",
    description:
      "Lat: 36.3920° N, Long: 74.8535° E | 2,500 meters above sea level",
    header: (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-xl">
        <Compass className="h-16 w-16" />
      </div>
    ),
    icon: <Mountain className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Getting Here",
    description:
      "Multiple transportation options to reach our picturesque village",
    header: (
      <div className="grid grid-cols-3 gap-2 h-full">
        <div className="bg-blue-400 rounded-xl flex items-center justify-center">
          <Car className="h-8 w-8 text-white" />
        </div>
        <div className="bg-green-400 rounded-xl flex items-center justify-center">
          <Plane className="h-8 w-8 text-white" />
        </div>
        <div className="bg-red-400 rounded-xl flex items-center justify-center">
          <Bus className="h-8 w-8 text-white" />
        </div>
      </div>
    ),
    icon: <Car className="h-4 w-4 text-neutral-500" />,
  },
  // ... (other items remain the same)
]
