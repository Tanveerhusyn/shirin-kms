"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

export const ImagesSlider = ({
  images,
  texts,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "right",
  imageClassName = "object-cover",
  zoomLevel = 1, // New prop for controlling zoom level
}: {
  images: string[]
  texts: string[]
  children: React.ReactNode
  overlay?: React.ReactNode
  overlayClassName?: string
  className?: string
  autoplay?: boolean
  direction?: "left" | "right"
  imageClassName?: string
  zoomLevel?: number // New prop
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    )
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    )
  }

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = () => {
    setLoading(true)
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = image
        img.onload = () => resolve(image)
        img.onerror = reject
      })
    })

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[])
        setLoading(false)
      })
      .catch((error) => console.error("Failed to load images", error))
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext()
      } else if (event.key === "ArrowLeft") {
        handlePrevious()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    let interval: any
    if (autoplay) {
      interval = setInterval(() => {
        handleNext()
      }, 3000)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearInterval(interval)
    }
  }, [])

  const slideVariants = {
    initial: (direction: string) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    exit: (direction: string) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  }

  const textVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
      },
    },
  }

  const areImagesLoaded = loadedImages.length > 0

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={`img-${currentIndex}`}
            src={loadedImages[currentIndex]}
            custom={direction}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className={cn(
              "image h-full w-full absolute inset-0",
              imageClassName
            )}
            style={{
              objectPosition: "center",
              transform: `scale(2)`,
            }}
          />
          <motion.div
            key={`text-${currentIndex}`}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={textVariants}
            className="absolute bottom-10 left-10 right-10 text-white text-2xl font-bold z-50"
          >
            {texts[currentIndex]}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
