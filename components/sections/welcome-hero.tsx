"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface WelcomeHeroProps {
  landingData: any[] | null
}

export default function WelcomeHero({ landingData }: WelcomeHeroProps) {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/village-hero.jpg"
          alt="Village panorama"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 container text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            Welcome to Our Village
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            A community rich in tradition, culture, and warmth
          </p>
          <button
            className="px-8 py-3 bg-primary text-white rounded-full 
                           text-lg font-medium hover:bg-primary/90 
                           transition-colors"
          >
            Explore Our Community
          </button>
        </motion.div>
      </div>
    </section>
  )
}
