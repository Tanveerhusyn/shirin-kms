"use client"

import { useEffect, useState } from "react"
import { mapConfig } from "@/providers/map-provider"
import { MARKER_ICONS } from "@/public/icons/markers"
import { useLoadScript } from "@react-google-maps/api"
import { AnimatePresence, motion } from "framer-motion"
import {
  BookOpen,
  ChevronRight,
  Globe,
  History,
  Home,
  Layers,
  Map,
  MapPin,
  Paintbrush,
  Sun,
  Trees,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { MapComponent } from "@/components/custom/map"

type PointOfInterest = {
  id: string
  title: string
  description: string
  position: { lat: number; lng: number }
  category: "historical" | "cultural" | "architectural" | "natural"
  media: string
  stories: Array<{
    title: string
    content: string
    contributor: string
    date: string
  }>
}

// Points of interest for Shirin Kamaris area
const samplePOIs: PointOfInterest[] = [
  {
    id: "ancient-well",
    title: "Ancient Community Well",
    description:
      "A 300-year-old well that served as the main water source and social gathering spot",
    position: { lat: 36.392155, lng: 74.853624 },
    category: "historical",
    media: "/images/well.jpg",
    stories: [
      {
        title: "The Well Keeper's Tale",
        content:
          "For generations, my family served as the well keepers. We maintained the sacred waters...",
        contributor: "Ahmad Khan, 78",
        date: "2023-04-15",
      },
    ],
  },
  {
    id: "weaving-house",
    title: "Traditional Weaving House",
    description:
      "Where the distinct Shirin Kamaris textile patterns have been created for centuries",
    position: { lat: 36.392354, lng: 74.854102 },
    category: "cultural",
    media: "/images/weaving.jpg",
    stories: [
      {
        title: "Patterns of Our Ancestors",
        content:
          "Each pattern tells a story. The mountain zigzag represents our journey through...",
        contributor: "Fatima Bibi, 82",
        date: "2023-05-22",
      },
    ],
  },
  {
    id: "main-bridge",
    title: "Connecting Bridge",
    description:
      "The wooden bridge connecting the two sides of the village, rebuilt every generation",
    position: { lat: 36.392805, lng: 74.853987 },
    category: "architectural",
    media: "/images/bridge.jpg",
    stories: [
      {
        title: "Bridge Building Ceremony",
        content:
          "When I was a child, I witnessed the bridge rebuilding ceremony. All families...",
        contributor: "Karim Shah, 65",
        date: "2023-03-10",
      },
    ],
  },
  {
    id: "elder-house",
    title: "Village Elder's House",
    description:
      "The traditional home of the village elder, where important community decisions are made",
    position: { lat: 36.391798, lng: 74.8543 },
    category: "architectural",
    media: "/images/elder-house.jpg",
    stories: [
      {
        title: "Council Meetings",
        content:
          "Every full moon, the elders gather here to discuss village matters and resolve disputes...",
        contributor: "Hassan Ali, 72",
        date: "2023-02-18",
      },
    ],
  },
  {
    id: "sacred-tree",
    title: "Ancient Sacred Tree",
    description:
      "A 500-year-old tree that's considered spiritually significant to the village",
    position: { lat: 36.393021, lng: 74.853215 },
    category: "natural",
    media: "/images/sacred-tree.jpg",
    stories: [
      {
        title: "Prayers at the Tree",
        content:
          "Before planting season, we gather at this tree to offer prayers for a good harvest...",
        contributor: "Noor Begum, 80",
        date: "2023-06-05",
      },
    ],
  },
]

// Category icons mapping
const categoryIcons = {
  historical: History,
  cultural: Paintbrush,
  architectural: Home,
  natural: Trees,
}

export default function DigitalTwinVillage() {
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null)
  const [mapMode, setMapMode] = useState<"satellite" | "roadmap">("satellite")
  const [showIntro, setShowIntro] = useState(true)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const [filteredCategories, setFilteredCategories] = useState<
    Record<string, boolean>
  >({
    historical: true,
    cultural: true,
    architectural: true,
    natural: true,
  })

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: ["places"],
  })

  // Close intro after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setFilteredCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Filter POIs based on selected categories
  const filteredPOIs = samplePOIs.filter(
    (poi) => filteredCategories[poi.category]
  )

  // Custom marker icons based on category
  const getMarkerIcon = (category: string) => {
    return (
      MARKER_ICONS[category as keyof typeof MARKER_ICONS] ||
      MARKER_ICONS.default
    )
  }

  // Handle marker click
  const handleMarkerClick = (markerId: string) => {
    const poi = samplePOIs.find((p) => p.id === markerId)
    if (poi) {
      setSelectedPOI(poi)
      setActiveStoryIndex(0)
    }
  }

  // Prepare markers for map component
  const mapMarkers = filteredPOIs.map((poi) => ({
    id: poi.id,
    position: poi.position,
    title: poi.title,
    icon: getMarkerIcon(poi.category),
    category: poi.category,
  }))

  // Handle next story navigation
  const handleNextStory = () => {
    if (selectedPOI && activeStoryIndex < selectedPOI.stories.length - 1) {
      setActiveStoryIndex((prev) => prev + 1)
    }
  }

  // Handle previous story navigation
  const handlePrevStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex((prev) => prev - 1)
    }
  }

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100 dark:bg-gray-900 rounded-lg">
        <p className="text-gray-800 dark:text-white text-xl">
          Error loading maps
        </p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100 dark:bg-gray-900 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
      id="digital-twin"
    >
      <div className="absolute inset-0 bg-[url(/topography.svg)] opacity-20 dark:opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center mb-3 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full">
            <Globe
              size={16}
              className="mr-2 text-emerald-600 dark:text-emerald-400"
            />
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              INTERACTIVE EXPERIENCE
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Digital Twin Village
          </h2>

          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore Shirin Kamaris through our interactive map. Discover
            historical sites, cultural landmarks, and hear stories from
            community members.
          </p>
        </motion.div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Filters Panel */}
          <motion.div
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Layers
                  size={18}
                  className="mr-2 text-emerald-600 dark:text-emerald-400"
                />
                Map Controls
              </h3>
            </div>

            {/* Map Mode Selection */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase mb-3">
                Map View
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {["satellite", "roadmap"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setMapMode(mode as any)}
                    className={cn(
                      "py-2 px-3 rounded-lg transition-all text-sm font-medium flex items-center justify-center",
                      mapMode === mode
                        ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-500 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700"
                        : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    )}
                  >
                    {mode === "satellite" ? (
                      <Sun size={14} className="mr-1.5" />
                    ) : (
                      <Map size={14} className="mr-1.5" />
                    )}
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div className="p-5">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase mb-3">
                Filter by Category
              </h4>
              <div className="space-y-2">
                {Object.keys(filteredCategories).map((category) => {
                  const IconComponent =
                    categoryIcons[category as keyof typeof categoryIcons]
                  return (
                    <motion.button
                      key={category}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        "w-full py-2.5 px-4 rounded-lg transition-all flex items-center",
                        filteredCategories[category]
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
                          : "bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                      )}
                    >
                      <IconComponent size={16} className="mr-2" />
                      <span className="font-medium capitalize">{category}</span>
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-white shadow border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full transition-colors",
                            filteredCategories[category]
                              ? "bg-emerald-500"
                              : "bg-gray-300 dark:bg-gray-600"
                          )}
                        />
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase mb-3">
                  Points of Interest
                </h4>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p className="mb-2">Total locations: {filteredPOIs.length}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.keys(filteredCategories).map((category) => (
                      <li key={`count-${category}`} className="text-xs">
                        {category}:{" "}
                        {
                          samplePOIs.filter((poi) => poi.category === category)
                            .length
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Component */}
          <motion.div
            className="lg:col-span-9 h-[600px] rounded-xl overflow-hidden shadow-lg relative border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MapComponent
              markers={mapMarkers}
              onMarkerClick={handleMarkerClick}
              mapTypeId={mapMode}
              center={{ lat: 36.3922, lng: 74.8538 }}
              zoom={17}
              height="600px"
              options={{
                ...mapConfig,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                ],
              }}
            />

            {/* Intro Overlay */}
            <AnimatePresence>
              {showIntro && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-lg text-center"
                  >
                    <MapPin
                      size={32}
                      className="text-emerald-500 mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Explore Our Virtual Village
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-5">
                      Click on the markers to discover stories, photos, and
                      information about important locations in our village.
                    </p>
                    <button
                      onClick={() => setShowIntro(false)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Start Exploring
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* POI Detail Overlay */}
            <AnimatePresence>
              {selectedPOI && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-5 rounded-t-xl shadow-lg border-t border-l border-r border-gray-200 dark:border-gray-700 max-h-[60%] overflow-y-auto"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {(() => {
                        const IconComponent =
                          categoryIcons[
                            selectedPOI.category as keyof typeof categoryIcons
                          ]
                        return (
                          <IconComponent
                            size={18}
                            className="mr-2 text-emerald-600 dark:text-emerald-400"
                          />
                        )
                      })()}
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 rounded-full px-2.5 py-1 capitalize">
                        {selectedPOI.category}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedPOI(null)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X
                        size={16}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedPOI.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedPOI.description}
                  </p>

                  {selectedPOI.stories.length > 0 && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800 dark:text-white flex items-center">
                          <BookOpen
                            size={14}
                            className="mr-1.5 text-emerald-600 dark:text-emerald-400"
                          />
                          {selectedPOI.stories[activeStoryIndex].title}
                        </h4>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Story {activeStoryIndex + 1} of{" "}
                          {selectedPOI.stories.length}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {selectedPOI.stories[activeStoryIndex].content}
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div>
                          By {selectedPOI.stories[activeStoryIndex].contributor}
                        </div>
                        <div>{selectedPOI.stories[activeStoryIndex].date}</div>
                      </div>

                      {selectedPOI.stories.length > 1 && (
                        <div className="flex justify-between mt-4">
                          <button
                            onClick={handlePrevStory}
                            disabled={activeStoryIndex === 0}
                            className={`p-2 rounded-full ${
                              activeStoryIndex === 0
                                ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            <ChevronRight size={16} className="rotate-180" />
                          </button>
                          <button
                            onClick={handleNextStory}
                            disabled={
                              activeStoryIndex ===
                              selectedPOI.stories.length - 1
                            }
                            className={`p-2 rounded-full ${
                              activeStoryIndex ===
                              selectedPOI.stories.length - 1
                                ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
