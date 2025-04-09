"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

import { ImagesSlider } from "../ui/images-slider"
import { FlipWordsDemo } from "./FlipWords"

export function ImagesSliderDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)

  const images = ["/HeroOne.jpg", "/main-2.jpg", "/main-1.JPG"]

  const texts = [
    {
      title: "Discover Kamaris Village",
      subtitle:
        "A hidden gem in the heart of Hunza valley, where tradition meets natural beauty",
    },
    {
      title: "Experience Local Culture",
      subtitle:
        "Immerse yourself in the rich heritage and authentic traditions of our community",
    },
    {
      title: "Breathtaking Landscapes",
      subtitle:
        "Surrounded by majestic mountains and pristine valleys offering unforgettable views",
    },
  ]

  // Handle autoplay
  useEffect(() => {
    if (!autoplayEnabled) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplayEnabled, images.length])

  // Pause autoplay when user interacts
  const handleManualChange = (newIndex: number) => {
    setAutoplayEnabled(false)
    setCurrentIndex(newIndex)

    // Resume autoplay after 10 seconds of inactivity
    const timer = setTimeout(() => {
      setAutoplayEnabled(true)
    }, 10000)

    return () => clearTimeout(timer)
  }

  // Handle next/prev
  const handleNext = () => {
    handleManualChange((currentIndex + 1) % images.length)
  }

  const handlePrev = () => {
    handleManualChange((currentIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      {/* Main Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {images.map((image, index) => (
            <motion.div
              key={`image-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
              style={{ zIndex: index === currentIndex ? 1 : 0 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image})`,
                  filter: "brightness(0.7)",
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <motion.div
            key={`text-container-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center max-w-4xl"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {texts[currentIndex].title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {texts[currentIndex].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium flex items-center transition-all duration-300"
              >
                Explore Village <ArrowRight size={18} className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-full font-medium transition-all duration-300"
              >
                Learn Our History
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => handleManualChange(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
