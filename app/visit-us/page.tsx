"use client"

import React, { ReactNode, useState } from "react"
import Image from "next/image"
import { MapProvider } from "@/providers/map-provider"
import { motion } from "framer-motion"
import {
  Bed,
  Calendar,
  Camera,
  Clock,
  Coffee,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  Trees,
} from "lucide-react"

import { HoverEffect } from "@/components/ui/card-hover-effect"
import { MapComponent } from "@/components/custom/map"

// Define types
type CardProps = {
  className?: string
  children: ReactNode
}

type AttractionType = {
  title: string
  description: string
  link: string
  icon: LucideIcon
}

// Define interface for HoverEffect item
interface HoverItem {
  title: string
  description: string
  link: string
}

// Define simple Card components
const Card = ({ className, children }: CardProps) => (
  <div className={`p-6 rounded-xl ${className}`}>{children}</div>
)

const CardTitle = ({ className, children }: CardProps) => (
  <h3 className={`text-xl font-bold mb-2 ${className}`}>{children}</h3>
)

const CardDescription = ({ className, children }: CardProps) => (
  <p className={`text-sm ${className}`}>{children}</p>
)

const VisitUs = () => {
  const [selectedSeason, setSelectedSeason] = useState<
    "spring" | "summer" | "autumn" | "winter"
  >("spring")

  const seasonImages = {
    spring: "/HeroOne.jpg",
    summer: "/main-1.JPG",
    autumn: "/autumn-village.jpg",
    winter: "/winter-village.jpg",
  }

  const attractions: AttractionType[] = [
    {
      title: "Historic Town Square",
      description:
        "Visit our beautiful historic town square with centuries of history",
      link: "#",
      icon: MapPin,
    },
    {
      title: "Local Artisan Market",
      description: "Discover handcrafted treasures and local specialties",
      link: "#",
      icon: Coffee,
    },
    {
      title: "Scenic Nature Trails",
      description:
        "Explore the breathtaking natural beauty surrounding our village",
      link: "#",
      icon: Trees,
    },
    {
      title: "Cozy Bed & Breakfast",
      description: "Stay in our charming accommodations with mountain views",
      link: "#",
      icon: Bed,
    },
    {
      title: "Annual Cultural Festival",
      description: "Experience our rich cultural heritage through festivities",
      link: "#",
      icon: Camera,
    },
  ]

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src={seasonImages[selectedSeason]}
          alt={`Village in ${selectedSeason}`}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Visit Our Village
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience the charm in every season
          </p>
          <div className="flex space-x-4">
            {(
              Object.keys(seasonImages) as Array<
                "spring" | "summer" | "autumn" | "winter"
              >
            ).map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-4 py-2 rounded-full text-sm md:text-base ${
                  selectedSeason === season
                    ? "bg-white text-black"
                    : "bg-black bg-opacity-50 hover:bg-opacity-75"
                }`}
              >
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
            Welcome to Our Charming Village
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Nestled in the heart of picturesque countryside, our village offers
            a perfect blend of history, culture, and natural beauty. Come and
            immerse yourself in our warm community and create lasting memories.
          </p>
        </section>

        {/* Top Attractions */}
        <section className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
            Top Attractions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attractions.map((attr, idx) => (
              <Card
                key={idx}
                className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
              >
                <CardTitle className="flex items-center text-neutral-800 dark:text-neutral-200">
                  {React.createElement(attr.icon, {
                    size: 24,
                    className: "mr-2 text-neutral-600 dark:text-neutral-400",
                  })}
                  {attr.title}
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-400">
                  {attr.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Map */}
        <section className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
            Explore Our Village
          </h3>
          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg shadow-md h-96 flex items-center justify-center">
            <MapProvider>
              <MapComponent />
            </MapProvider>
          </div>
        </section>

        {/* Visit Information */}
        <section className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
            Plan Your Visit
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4 flex items-center text-neutral-800 dark:text-neutral-200">
                <Calendar className="mr-2" size={24} /> Opening Hours
              </h4>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
                <li>Saturday: 10:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4 flex items-center text-neutral-800 dark:text-neutral-200">
                <MapPin className="mr-2" size={24} /> Getting Here
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Our village is located 30 minutes from the nearest city. Public
                transportation and parking available.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
            Contact Us
          </h3>
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Phone className="mr-2" size={24} />
                <span className="text-neutral-600 dark:text-neutral-400">
                  +1 (123) 456-7890
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2" size={24} />
                <span className="text-neutral-600 dark:text-neutral-400">
                  info@ourvillage.com
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" size={24} />
                <span className="text-neutral-600 dark:text-neutral-400">
                  123 Village Road, Country
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default VisitUs
