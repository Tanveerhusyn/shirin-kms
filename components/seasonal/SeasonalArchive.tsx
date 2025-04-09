"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Calendar, Play, Tag, X } from "lucide-react"

type Season = "spring" | "summer" | "autumn" | "winter"

interface TraditionItem {
  id: string
  title: string
  description: string
  month: string
  mediaUrl: string
  videoUrl?: string
  type: "festival" | "agriculture" | "craft" | "food" | "ritual"
}

// Sample seasonal traditions data
const seasonalTraditions: Record<Season, TraditionItem[]> = {
  spring: [
    {
      id: "nowruz",
      title: "Nowruz Celebration",
      description:
        "The traditional new year celebration with special meals, customs, and community gatherings that mark the arrival of spring.",
      month: "March",
      mediaUrl: "/images/nowruz.jpg",
      videoUrl: "/videos/nowruz.mp4",
      type: "festival",
    },
    {
      id: "spring-planting",
      title: "Spring Planting Ceremony",
      description:
        "Community gathering where the first seeds are planted using ancient methods and accompanied by traditional songs and prayers.",
      month: "April",
      mediaUrl: "/images/spring-planting.jpg",
      type: "agriculture",
    },
    {
      id: "flower-festival",
      title: "Mountain Flower Festival",
      description:
        "Celebration of the unique wildflowers that bloom in the surrounding mountains, with medicinal plant collection and knowledge sharing.",
      month: "May",
      mediaUrl: "/images/flower-festival.jpg",
      type: "ritual",
    },
  ],
  summer: [
    {
      id: "water-blessing",
      title: "Water Blessing Ceremony",
      description:
        "A spiritual gathering at the mountain spring that provides water to the village, with prayers for continued abundance.",
      month: "June",
      mediaUrl: "/images/water-blessing.jpg",
      type: "ritual",
    },
    {
      id: "summer-solstice",
      title: "Summer Solstice Bonfire",
      description:
        "The longest day is celebrated with a community bonfire, traditional music, dancing, and storytelling that lasts until dawn.",
      month: "June",
      mediaUrl: "/images/summer-solstice.jpg",
      videoUrl: "/videos/solstice.mp4",
      type: "festival",
    },
    {
      id: "wool-gathering",
      title: "Annual Wool Gathering",
      description:
        "Families collect and process wool from local sheep using traditional methods passed down through generations.",
      month: "July",
      mediaUrl: "/images/wool-gathering.jpg",
      type: "craft",
    },
  ],
  autumn: [
    {
      id: "harvest-festival",
      title: "Harvest Thanksgiving",
      description:
        "Village-wide celebration of the successful harvest with sharing of crops, traditional foods, and expressing gratitude.",
      month: "September",
      mediaUrl: "/images/harvest-festival.jpg",
      type: "festival",
    },
    {
      id: "apple-pressing",
      title: "Traditional Apple Pressing",
      description:
        "Community gathering to press apples for juice and cider using a wooden press that's over 150 years old.",
      month: "October",
      mediaUrl: "/images/apple-pressing.jpg",
      type: "food",
    },
    {
      id: "weaving-season",
      title: "Winter Weaving Preparation",
      description:
        "Women gather to prepare looms and materials for the intensive winter weaving season, sharing patterns and techniques.",
      month: "November",
      mediaUrl: "/images/weaving-prep.jpg",
      type: "craft",
    },
  ],
  winter: [
    {
      id: "winter-solstice",
      title: "Winter Solstice Lights",
      description:
        "The shortest day of the year marked with lanterns throughout the village and stories of the returning sun.",
      month: "December",
      mediaUrl: "/images/winter-solstice.jpg",
      type: "festival",
    },
    {
      id: "storytelling-nights",
      title: "Winter Storytelling Nights",
      description:
        "Long winter evenings are filled with village elders sharing traditional stories, myths, and legends around communal fires.",
      month: "January",
      mediaUrl: "/images/storytelling.jpg",
      videoUrl: "/videos/stories.mp4",
      type: "ritual",
    },
    {
      id: "ice-harvest",
      title: "Traditional Ice Harvest",
      description:
        "The ancient practice of harvesting ice from the mountain lake to preserve food through winter and early spring.",
      month: "February",
      mediaUrl: "/images/ice-harvest.jpg",
      type: "agriculture",
    },
  ],
}

// Season theme configurations
const seasonConfig = {
  spring: {
    colors: {
      primary: "emerald-500",
      light: "emerald-50",
      dark: "emerald-700",
      gradient:
        "from-emerald-50 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-900/10",
      text: "emerald-700 dark:emerald-300",
      border: "emerald-200 dark:emerald-800",
    },
    icon: "🌱",
    bgPattern: "url('/patterns/spring.svg')",
  },
  summer: {
    colors: {
      primary: "amber-500",
      light: "amber-50",
      dark: "amber-700",
      gradient:
        "from-amber-50 to-amber-200 dark:from-amber-900/30 dark:to-amber-900/10",
      text: "amber-700 dark:amber-300",
      border: "amber-200 dark:amber-800",
    },
    icon: "☀️",
    bgPattern: "url('/patterns/summer.svg')",
  },
  autumn: {
    colors: {
      primary: "orange-500",
      light: "orange-50",
      dark: "orange-700",
      gradient:
        "from-orange-50 to-orange-200 dark:from-orange-900/30 dark:to-orange-900/10",
      text: "orange-700 dark:orange-300",
      border: "orange-200 dark:orange-800",
    },
    icon: "🍂",
    bgPattern: "url('/patterns/autumn.svg')",
  },
  winter: {
    colors: {
      primary: "sky-500",
      light: "sky-50",
      dark: "sky-700",
      gradient:
        "from-sky-50 to-sky-200 dark:from-sky-900/30 dark:to-sky-900/10",
      text: "sky-700 dark:sky-300",
      border: "sky-200 dark:sky-800",
    },
    icon: "❄️",
    bgPattern: "url('/patterns/winter.svg')",
  },
}

// Type mapping for UI elements
const typeIcons: Record<string, string> = {
  festival: "🎭",
  agriculture: "🌾",
  craft: "🧶",
  food: "🍲",
  ritual: "✨",
}

export default function SeasonalArchive() {
  const [activeSeason, setActiveSeason] = useState<Season>("spring")
  const [selectedTradition, setSelectedTradition] =
    useState<TraditionItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const seasons: Season[] = ["spring", "summer", "autumn", "winter"]
  const seasonTheme = seasonConfig[activeSeason]

  // Close modal when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false)
        setShowVideo(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  // Handle tradition click
  const handleTraditionClick = (tradition: TraditionItem) => {
    setSelectedTradition(tradition)
    setIsModalOpen(true)
    setShowVideo(false)
  }

  // Toggle video display
  const toggleVideo = () => {
    setShowVideo(!showVideo)
  }

  // Helper function to get classes based on season
  const getSeasonClasses = (
    type: "badge" | "button" | "text" | "icon" | "border"
  ) => {
    const theme = seasonConfig[activeSeason].colors

    switch (type) {
      case "badge":
        return `bg-${theme.light} dark:bg-${theme.dark}/20`
      case "button":
        return `bg-${theme.primary} hover:bg-${theme.dark}`
      case "text":
        return `text-${theme.text}`
      case "icon":
        return `text-${theme.primary}`
      case "border":
        return `border-${theme.border}`
      default:
        return ""
    }
  }

  return (
    <section
      className={`relative py-24 bg-gradient-to-b ${seasonTheme.colors.gradient}`}
      id="seasonal-traditions"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: seasonTheme.bgPattern || "url('/patterns/dots.svg')",
          backgroundSize: "200px",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center mb-3 bg-white/20 dark:bg-white/5 px-4 py-1.5 rounded-full">
            <Calendar
              size={16}
              className={`mr-2 ${getSeasonClasses("icon")}`}
            />
            <span className={`text-sm font-medium ${getSeasonClasses("text")}`}>
              SEASONAL TRADITIONS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Cultural Calendar
          </h2>

          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the rich seasonal traditions, festivals, and practices that
            shape life in Shirin Kamaris throughout the year.
          </p>
        </motion.div>

        {/* Season selector */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-xl flex flex-wrap shadow-sm border border-gray-200 dark:border-gray-700">
            {seasons.map((season) => {
              const isActive = activeSeason === season
              const theme = seasonConfig[season].colors

              return (
                <motion.button
                  key={season}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveSeason(season)}
                  className={`
                    px-5 py-2.5 rounded-lg font-medium transition-all duration-300 mx-1
                    ${
                      isActive
                        ? `bg-${theme.primary} text-white shadow-md`
                        : `text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50`
                    }
                  `}
                >
                  <span className="mr-2">{seasonConfig[season].icon}</span>
                  {season.charAt(0).toUpperCase() + season.slice(1)}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Traditions grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`traditions-${activeSeason}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {seasonalTraditions[activeSeason].map((tradition) => (
              <motion.div
                key={tradition.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                onClick={() => handleTraditionClick(tradition)}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-52">
                  <Image
                    src={tradition.mediaUrl}
                    alt={tradition.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />

                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      bg-${seasonTheme.colors.primary}/80 text-white backdrop-blur-sm`}
                    >
                      {tradition.month}
                    </span>

                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 backdrop-blur-sm"
                    >
                      {typeIcons[tradition.type]} {tradition.type}
                    </span>
                  </div>

                  {tradition.videoUrl && (
                    <div className="absolute bottom-3 right-3">
                      <div
                        className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full
                        shadow-md border ${getSeasonClasses("border")}`}
                      >
                        <Play size={16} className={getSeasonClasses("icon")} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {tradition.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {tradition.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button
                      className={`text-sm font-medium ${getSeasonClasses(
                        "icon"
                      )} flex items-center hover:underline`}
                    >
                      Learn more <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedTradition && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X size={20} />
                  </button>

                  <div className="h-72 relative">
                    {showVideo && selectedTradition.videoUrl ? (
                      <div className="absolute inset-0 bg-black">
                        <video
                          src={selectedTradition.videoUrl}
                          controls
                          autoPlay
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <>
                        <Image
                          src={selectedTradition.mediaUrl}
                          alt={selectedTradition.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        {selectedTradition.videoUrl && (
                          <button
                            onClick={toggleVideo}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                          >
                            <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                              <Play
                                size={24}
                                className={getSeasonClasses("icon")}
                              />
                            </div>
                            <span className="absolute bottom-4 left-0 right-0 text-center text-white font-medium drop-shadow-lg">
                              Watch Video
                            </span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${getSeasonClasses("badge")} ${getSeasonClasses("text")}`}
                    >
                      <Calendar size={12} className="mr-1" />
                      {selectedTradition.month}
                    </span>

                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <Tag size={12} className="mr-1" />
                      {selectedTradition.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedTradition.title}
                  </h3>

                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedTradition.description}
                    </p>

                    <p className="mt-4">
                      This tradition plays a crucial role in maintaining our
                      cultural heritage and strengthening community bonds.
                      Passed down through generations, it connects us to our
                      ancestors and reminds us of our shared history.
                    </p>

                    <p>
                      The practice has evolved over time while preserving its
                      core meaning. Today, both young and old participate,
                      ensuring that this valuable tradition continues to thrive
                      for future generations.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Documented by the Shirin Kamaris Heritage Project
                    </div>

                    <button
                      className={`px-4 py-2 ${getSeasonClasses(
                        "button"
                      )} text-white rounded-lg transition-colors mt-4 sm:mt-0`}
                    >
                      Learn More About This Tradition
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
