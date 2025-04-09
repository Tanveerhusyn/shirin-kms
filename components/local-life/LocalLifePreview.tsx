"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

const PREVIEW_ITEMS = [
  {
    title: "Daily Life",
    description: "Experience the rhythms and routines of mountain life",
    icon: "/icons/daily-life-icon.svg",
    image: "/images/local-life/morning-routines.jpg",
  },
  {
    title: "Traditional Practices",
    description: "Ancient sustainable techniques and craftsmanship",
    icon: "/icons/traditional-practices-icon.svg",
    image: "/images/local-life/water-management.jpg",
  },
  {
    title: "Local Cuisine",
    description: "Culinary heritage passed through generations",
    icon: "/icons/cuisine-icon.svg",
    image: "/images/local-life/harissa.jpg",
  },
]

export default function LocalLifePreview() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-medium text-emerald-600 tracking-wide uppercase flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            DISCOVER OUR CULTURE
          </h2>
          <h3 className="mt-3 text-3xl font-bold text-gray-900">
            Authentic Cultural Experiences
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover the rich traditions and daily rhythms that make Kamaris a
            living cultural treasure of the Hunza Valley.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {PREVIEW_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-md">
                    <Image
                      src={item.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="text-emerald-600"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/local-life"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Explore Local Life
            <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
