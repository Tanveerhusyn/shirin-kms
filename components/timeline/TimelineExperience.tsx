"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Compass,
  Home,
  MapPin,
  Mountain,
  Pause,
  Play,
  Snowflake,
  Sunrise,
  X,
} from "lucide-react"

// Define type for heritage data
interface HeritageData {
  id: string
  [key: string]: any
}

// Trip planning information for each experience
const tripPlanningInfo = {
  "Winter Wonderland": {
    bestTime: "December to February",
    stayOptions: [
      "Gulmit Continental Hotel",
      "Mountain Lodge",
      "Homestay with locals",
    ],
    transportation: "4x4 vehicles recommended due to snow",
    tips: "Pack warm layers, thermal clothing, and snow boots. Daytime temperatures range from -5°C to 5°C.",
    localGuide:
      "Highly recommended for winter treks and photography expeditions",
  },
  "Spring Awakening": {
    bestTime: "March to May",
    stayOptions: [
      "Gulmit Guest House",
      "Eco Retreat Hunza",
      "Camping options available",
    ],
    transportation:
      "Regular vehicles accessible, local transport available from Gulmit center",
    tips: "Weather can be unpredictable - pack layers and rain protection. Great time for photography.",
    localGuide: "Recommended for wildflower excursions and cultural immersion",
  },
  "Summer Adventures": {
    bestTime: "June to August",
    stayOptions: [
      "Eagle's Nest Hotel",
      "Hunza Serena Inn",
      "Camping near Borith Lake",
    ],
    transportation: "All roads accessible, trekking routes clearly marked",
    tips: "Ideal time for longer treks. Carry sun protection, sturdy hiking boots, and plenty of water.",
    localGuide: "Essential for mountain treks to Ghulkin Glacier",
  },
  "Autumn Splendor": {
    bestTime: "September to November",
    stayOptions: [
      "Gulmit Continental Hotel",
      "Hunza View Hotel",
      "Luxury tents available",
    ],
    transportation:
      "All roads open, private cars and local transports available",
    tips: "Perfect photography conditions. Bring warm clothes for evenings as temperatures drop quickly.",
    localGuide: "Optional but recommended for harvest experiences",
  },
  "Stargazing Nights": {
    bestTime: "Year-round (best in winter when skies are clearest)",
    stayOptions: [
      "Mountain View Retreats",
      "Glamping options",
      "Rooftop stays",
    ],
    transportation: "Night transportation can be arranged with hotels",
    tips: "Bring warm clothing even in summer as nights get cold. A good camera with night mode is essential.",
    localGuide: "Astronomy guides available for night sky tours",
  },
  "Cultural Immersion": {
    bestTime: "Year-round (festivals mostly in spring and autumn)",
    stayOptions: [
      "Homestays with Wakhi families",
      "Cultural Heritage Inn",
      "Local guesthouses",
    ],
    transportation: "Local transport connects all cultural sites",
    tips: "Learn basic Wakhi phrases. Bring small gifts when visiting local homes as a gesture of goodwill.",
    localGuide: "Essential for cultural context and translation",
  },
}

// Defined seasonal experiences of Kamaris
const kamarisExperiences = [
  {
    title: "Winter Wonderland",
    season: "Winter",
    description:
      "Snow-blanketed landscapes transform Kamaris into a serene winter paradise with breathtaking views of the Hunza Valley.",
    image: "/HeroOne.jpg",
    activities: "Snow trekking, photography, enjoying traditional warm cuisine",
    icon: Snowflake,
    color: "#0ea5e9",
  },
  {
    title: "Spring Awakening",
    season: "Spring",
    description:
      "Witness nature's rebirth as wildflowers bloom across the hillsides with the majestic backdrop of snow-capped mountains.",
    image: "/main-1.jpg",
    activities:
      "Bird watching, photography, cultural immersion with the Wakhi community",
    icon: Sunrise,
    color: "#10b981",
  },
  {
    title: "Summer Adventures",
    season: "Summer",
    description:
      "Perfect weather for trekking from Gulmit through Kamaris to Ghulkin Glacier, Borith Lake, and Hussaini Bridge.",
    image: "/main-2.jpg",
    activities: "Trekking, mountaineering, camping, cultural exchange",
    icon: Mountain,
    color: "#047857",
  },
  {
    title: "Autumn Splendor",
    season: "Autumn",
    description:
      "Vibrant autumn colors paint the landscape, creating a photographer's paradise against crystal-clear blue skies.",
    image: "/main-3.jpg",
    activities: "Photography, hiking, harvesting experiences with locals",
    icon: Cloud,
    color: "#ea580c",
  },
  {
    title: "Stargazing Nights",
    season: "Year-round",
    description:
      "Kamaris' elevation and minimal light pollution make it perfect for witnessing the galaxy's brilliance after sunset.",
    image: "/main-4.jpg",
    activities: "Astronomy, night photography, storytelling around bonfires",
    icon: Cloud,
    color: "#4f46e5",
  },
  {
    title: "Cultural Immersion",
    season: "Year-round",
    description:
      "Experience the warmth and hospitality of the Wakhi community, preserving their rich heritage through generations.",
    image: "/main-5.jpg",
    activities: "Traditional music, cuisine, folklore, handicrafts",
    icon: Cloud,
    color: "#be123c",
  },
]

export default function TimelineExperience({
  heritageData,
}: {
  heritageData: HeritageData[] | null
}) {
  const [activeExperience, setActiveExperience] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Time between auto-slides in milliseconds
  const SLIDE_INTERVAL = 6000

  // Handle auto-slide functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
    }

    autoPlayIntervalRef.current = setInterval(() => {
      setActiveExperience((prev) => (prev + 1) % kamarisExperiences.length)
    }, SLIDE_INTERVAL)
  }, [])

  const stopAutoPlay = useCallback(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
      autoPlayIntervalRef.current = null
    }
  }, [])

  // Toggle auto-play state
  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev)
  }

  // Open trip planning modal
  const openPlanModal = () => {
    setShowPlanModal(true)
    stopAutoPlay() // Pause slideshow when modal is open
  }

  // Close trip planning modal
  const closePlanModal = () => {
    setShowPlanModal(false)
    if (isAutoPlaying) {
      startAutoPlay() // Resume slideshow if it was playing
    }
  }

  // Setup auto-slide and cleanup on unmount
  useEffect(() => {
    setIsLoaded(true)

    if (isAutoPlaying && !showPlanModal) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }

    // Cleanup on component unmount
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [isAutoPlaying, showPlanModal, startAutoPlay, stopAutoPlay])

  // Reset interval when slide changes manually
  useEffect(() => {
    if (isAutoPlaying && !showPlanModal) {
      startAutoPlay()
    }
  }, [activeExperience, isAutoPlaying, showPlanModal, startAutoPlay])

  // Handle navigation
  const goToNext = () => {
    setActiveExperience((prev) => (prev + 1) % kamarisExperiences.length)
  }

  const goToPrev = () => {
    setActiveExperience(
      (prev) =>
        (prev - 1 + kamarisExperiences.length) % kamarisExperiences.length
    )
  }

  // Handle direct navigation
  const goToIndex = (index: number) => {
    setActiveExperience(index)
  }

  const experience = kamarisExperiences[activeExperience]
  const Icon = experience.icon
  const planInfo =
    tripPlanningInfo[experience.title as keyof typeof tripPlanningInfo]

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Fullscreen Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${activeExperience}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              quality={90}
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Scenic Badge */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm"
        >
          <Mountain size={16} className="text-emerald-400" />
          <span className="text-sm font-medium text-white">
            EXPERIENCE KAMARIS
          </span>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeExperience}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl w-full mx-auto"
          >
            {/* Season Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full"
              style={{ backgroundColor: `${experience.color}CC` }}
            >
              <Icon size={16} className="text-white" />
              <span className="text-sm md:text-base font-medium text-white">
                {experience.season}
              </span>
            </motion.div>

            {/* Experience Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-5 tracking-tight leading-tight"
            >
              {experience.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {experience.description}
            </motion.p>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
            >
              {experience.activities.split(", ").map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: experience.color }}
                  ></div>
                  <span className="text-sm font-medium">{activity}</span>
                </div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mx-auto flex items-center px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all shadow-lg"
              style={{ backgroundColor: experience.color }}
              onClick={openPlanModal}
            >
              Plan Your Visit <ArrowRight size={18} className="ml-2" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Auto-play Controls */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-40 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10"
        aria-label="Previous experience"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10"
        aria-label="Next experience"
      >
        <ChevronRight size={24} />
      </button>

      {/* Experiences Navigation */}
      <div className="absolute bottom-10 left-0 right-0 z-40">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Progress Bar */}
          <div className="h-1 bg-white/20 rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                backgroundColor: experience.color,
                width: `${
                  (activeExperience / (kamarisExperiences.length - 1)) * 100
                }%`,
                transition: "width 0.5s ease-in-out",
              }}
            />
          </div>

          {/* Experience Dots */}
          <div className="flex justify-between items-center">
            {kamarisExperiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className="group flex flex-col items-center"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeExperience
                      ? "scale-125"
                      : "bg-white/50 group-hover:bg-white/80"
                  }`}
                  style={{
                    backgroundColor:
                      index === activeExperience ? exp.color : undefined,
                  }}
                />

                {index === activeExperience && (
                  <span className="text-xs text-white/80 mt-2 font-medium hidden md:block">
                    {exp.season}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trip Planning Modal */}
      <AnimatePresence>
        {showPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closePlanModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden w-full max-w-2xl relative z-10 border border-white/20"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Modal Header */}
              <div
                className="p-6 border-b border-white/10 flex justify-between items-center"
                style={{ backgroundColor: `${experience.color}99` }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={24} className="text-white" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Plan Your {experience.title} Visit
                  </h3>
                </div>
                <button
                  onClick={closePlanModal}
                  className="rounded-full p-2 bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 text-white space-y-6">
                {/* Best Time */}
                <div className="flex items-start gap-4">
                  <Calendar
                    className="text-white/80 mt-1 flex-shrink-0"
                    size={22}
                  />
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Best Time to Visit
                    </h4>
                    <p className="text-white/80">{planInfo.bestTime}</p>
                  </div>
                </div>

                {/* Accommodation */}
                <div className="flex items-start gap-4">
                  <Home
                    className="text-white/80 mt-1 flex-shrink-0"
                    size={22}
                  />
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Where to Stay
                    </h4>
                    <ul className="text-white/80 space-y-1">
                      {planInfo.stayOptions.map((option, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: experience.color }}
                          ></div>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Transportation */}
                <div className="flex items-start gap-4">
                  <MapPin
                    className="text-white/80 mt-1 flex-shrink-0"
                    size={22}
                  />
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Getting There
                    </h4>
                    <p className="text-white/80">{planInfo.transportation}</p>
                  </div>
                </div>

                {/* Tips */}
                <div className="flex items-start gap-4">
                  <Compass
                    className="text-white/80 mt-1 flex-shrink-0"
                    size={22}
                  />
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Traveler Tips
                    </h4>
                    <p className="text-white/80">{planInfo.tips}</p>
                    <p className="text-white/80 mt-2">
                      <span className="font-medium">Local Guide:</span>{" "}
                      {planInfo.localGuide}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 flex justify-between">
                <button
                  onClick={closePlanModal}
                  className="px-4 py-2 rounded-md border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
                <button
                  className="px-5 py-2 rounded-md text-white flex items-center gap-2 transition-colors"
                  style={{ backgroundColor: experience.color }}
                >
                  Book Now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
