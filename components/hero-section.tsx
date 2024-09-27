// components/HeroSection.js
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

import { ImagesSliderDemo } from "./custom/ImageSlider"

// Define your slides array with title and image path
const slides = [
  { title: "Welcome to Our Site", imagePath: "/images/hero1.jpg" },
  { title: "Discover Amazing Features", imagePath: "/images/hero2.jpg" },
  { title: "Join Our Community", imagePath: "/images/hero3.jpg" },
  // Add more slides as needed
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const imageRefs = useRef([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 10000) // Change slide every 10 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Preload the next image
    const nextSlide = (currentSlide + 1) % slides.length
    if (imageRefs.current[nextSlide]) {
      imageRefs.current[nextSlide].src = slides[nextSlide].imagePath
    }
  }, [currentSlide])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <ImagesSliderDemo />
    </section>
  )
}
