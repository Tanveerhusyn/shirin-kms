"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"

interface ReelProps {
  videoSrc: string
  creatorName: string
  creatorLink: string
}

const VillageReel: React.FC<ReelProps> = ({
  videoSrc,
  creatorName,
  creatorLink,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative w-full max-w-sm mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-[600px] object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <a
          href={creatorLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-sm font-medium hover:underline"
        >
          @{creatorName}
        </a>
      </div>
      <div className="absolute top-4 right-4 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>
    </div>
  )
}

const VillageReelsSection: React.FC = () => {
  const reels = [
    {
      videoSrc: "/video-1.mp4",
      creatorName: "village_explorer",
      creatorLink: "https://instagram.com/village_explorer",
    },
    {
      videoSrc: "/videos/village-reel-2.mp4",
      creatorName: "nature_lover",
      creatorLink: "https://instagram.com/nature_lover",
    },
    {
      videoSrc: "/videos/village-reel-3.mp4",
      creatorName: "local_guide",
      creatorLink: "https://instagram.com/local_guide",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          Village Life in Motion
        </h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Experience the vibrant life of Shirin Kamaris through these
          captivating reels. Dive into our culture, landscapes, and daily
          moments captured by talented creators.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reels.map((reel, index) => (
            <VillageReel key={index} {...reel} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default VillageReelsSection
