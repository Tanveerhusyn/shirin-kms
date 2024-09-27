"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { Tabs } from "../ui/tabs"

const ShirinKamarisProfile: React.FC = () => {
  const tabs = [
    {
      title: "History",
      value: "history",
      content: (
        <div className="w-full overflow-hidden relative rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-green-700 to-emerald-900">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Rich Heritage of Shirin Kamaris
          </h2>
          <p className="text-sm md:text-lg mb-6">
            Nestled in the heart of the Karakoram mountains, Shirin Kamaris
            boasts a history dating back to the 15th century. Originally a small
            trading post, it has evolved into a vibrant community that
            beautifully preserves its cultural heritage.
          </p>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1566419808810-658178380987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yaWNhbCUyMHZpbGxhZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Historical Shirin Kamaris"
              width={800}
              height={400}
              className="rounded-xl w-full h-48 md:h-64 object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 bg-white text-green-700 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
            >
              Read More
            </motion.button>
          </div>
        </div>
      ),
    },
    {
      title: "Culture",
      value: "culture",
      content: (
        <div className="w-full overflow-hidden relative rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-purple-700 to-indigo-900">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Vibrant Culture of Shirin Kamaris
          </h2>
          <p className="text-sm md:text-lg mb-6">
            Our village is a tapestry of traditions, music, and festivals. We're
            renowned for intricate woodcarving, colorful textiles, and
            traditional music played on instruments like the rubab and daf.
          </p>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVyYWwlMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Cultural Festival in Shirin Kamaris"
              width={800}
              height={400}
              className="rounded-xl w-full h-48 md:h-64 object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 bg-white text-purple-700 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
            >
              Read More
            </motion.button>
          </div>
        </div>
      ),
    },
    {
      title: "Nature",
      value: "nature",
      content: (
        <div className="w-full overflow-hidden relative rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-green-600 to-teal-800">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Natural Beauty of Shirin Kamaris
          </h2>
          <p className="text-sm md:text-lg mb-6">
            Our village is surrounded by 4,000 hectares of pristine forests and
            meadows, offering breathtaking views and diverse flora and fauna.
            Experience crystal-clear streams, alpine meadows, and rare wildlife.
          </p>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjB2aWxsYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
              alt="Natural Landscape of Shirin Kamaris"
              width={800}
              height={400}
              className="rounded-xl w-full h-48 md:h-64 object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 bg-white text-teal-700 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
            >
              Read More
            </motion.button>
          </div>
        </div>
      ),
    },
    {
      title: "Economy",
      value: "economy",
      content: (
        <div className="w-full overflow-hidden relative rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-yellow-600 to-orange-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Sustainable Economy of Shirin Kamaris
          </h2>
          <p className="text-sm md:text-lg mb-6">
            Our economy is diverse and sustainable, based on agriculture,
            traditional handicrafts, and growing eco-tourism. We produce
            high-quality fruits, nuts, and vegetables, and our artisans create
            world-renowned crafts.
          </p>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1501180984405-c4b9d9c6efe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJhbCUyMHJlc291cmNlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Economic Activities in Shirin Kamaris"
              width={800}
              height={400}
              className="rounded-xl w-full h-48 md:h-64 object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 bg-white text-orange-700 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
            >
              Read More
            </motion.button>
          </div>
        </div>
      ),
    },
    {
      title: "Visit",
      value: "visit",
      content: (
        <div className="w-full overflow-hidden relative rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br from-blue-600 to-cyan-800">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Experience Shirin Kamaris
          </h2>
          <p className="text-sm md:text-lg mb-6">
            Come and explore our beautiful village! Enjoy breathtaking mountain
            vistas, immerse yourself in our rich culture, and experience the
            warm hospitality of our 2,500 residents. Discover over 200
            traditional houses and participate in our vibrant festivals.
          </p>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Scenic View of Shirin Kamaris"
              width={800}
              height={400}
              className="rounded-xl w-full h-48 md:h-64 object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 bg-white text-blue-700 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
            >
              Read More
            </motion.button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-transparent h-[400px] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}

export default ShirinKamarisProfile
