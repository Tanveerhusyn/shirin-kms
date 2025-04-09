"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { createClient } from "@/utills/supabase/client"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"

// Media categories for filtering
const MEDIA_CATEGORIES = [
  { id: "all", name: "All" },
  { id: "culture", name: "Cultural Life" },
  { id: "landscapes", name: "Landscapes" },
  { id: "people", name: "People" },
  { id: "architecture", name: "Architecture" },
  { id: "festivals", name: "Festivals" },
  { id: "videos", name: "Videos" },
]

// Media item type definition
type MediaItem = {
  id: string
  title: string
  description: string
  type: "image" | "video"
  thumbnail: string
  source: string
  categories: string[]
  date: string
  featured?: boolean
}

export default function MediaHub() {
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState("all")

  // State for search term
  const [searchTerm, setSearchTerm] = useState("")

  // State for the selected media item to view in the modal
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  // State for media items
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch media items from Supabase
  useEffect(() => {
    const fetchMediaItems = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("media_items")
          .select("*")
          .order("date", { ascending: false })

        if (error) {
          throw error
        }

        if (data) {
          // Transform the data to match our MediaItem type
          const formattedData: MediaItem[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            type: item.type,
            thumbnail: item.thumbnail,
            source: item.source,
            categories: item.categories,
            date: item.date,
            featured: item.featured,
          }))

          setMediaItems(formattedData)
        }
      } catch (err) {
        console.error("Error fetching media items:", err)
        setError("Failed to load media. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMediaItems()
  }, [])

  // Filter media items based on selected category and search term
  const filteredMedia = mediaItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.categories.includes(selectedCategory)
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Handle media item selection
  const handleSelectMedia = (media: MediaItem) => {
    setSelectedMedia(media)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  // Handle closing the media viewer
  const handleCloseMedia = () => {
    setSelectedMedia(null)
    document.body.style.overflow = "" // Restore scrolling
  }

  // Handle key press events for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedMedia) {
        handleCloseMedia()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedMedia])

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-medium text-emerald-600 tracking-wide uppercase flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            EXPLORE VISUAL STORIES
          </h2>
          <h3 className="mt-3 text-3xl font-bold text-gray-900">
            Kamaris Media Hub
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Experience the beauty, culture, and traditions of Kamaris through
            our collection of images and videos.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-2 w-full md:w-auto">
            {MEDIA_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content (only show when not loading and no errors) */}
        {!isLoading && !error && (
          <>
            {/* Featured Media Highlight (if any are featured) */}
            {filteredMedia.some((item) => item.featured) &&
              selectedCategory === "all" &&
              !searchTerm && (
                <div className="mb-12">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Featured Media
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMedia
                      .filter((item) => item.featured)
                      .map((media) => (
                        <motion.div
                          key={media.id}
                          layoutId={media.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="relative overflow-hidden rounded-xl shadow-md aspect-video cursor-pointer group"
                          onClick={() => handleSelectMedia(media)}
                        >
                          <Image
                            src={media.thumbnail}
                            alt={media.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
                            {media.type === "video" && (
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full">
                                  <PlayIcon className="h-8 w-8 text-white" />
                                </div>
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="text-white font-bold text-lg">
                                {media.title}
                              </h3>
                              <p className="text-gray-200 text-sm mt-1 line-clamp-1">
                                {media.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia
                .filter((item) =>
                  selectedCategory === "all"
                    ? !item.featured || searchTerm
                    : true
                )
                .map((media) => (
                  <motion.div
                    key={media.id}
                    layoutId={media.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl shadow-md aspect-video cursor-pointer group"
                    onClick={() => handleSelectMedia(media)}
                  >
                    <Image
                      src={media.thumbnail}
                      alt={media.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
                      {media.type === "video" && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full">
                            <PlayIcon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg">
                          {media.title}
                        </h3>
                        <p className="text-gray-200 text-sm mt-1 line-clamp-1">
                          {media.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* No results message */}
            {filteredMedia.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No media found matching your criteria. Try adjusting your
                  search or filters.
                </p>
              </div>
            )}
          </>
        )}

        {/* Media Viewer Modal */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
              onClick={handleCloseMedia}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                onClick={handleCloseMedia}
              >
                <XMarkIcon className="h-8 w-8" />
              </button>

              {/* Media content */}
              <motion.div
                layoutId={selectedMedia.id}
                className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-lg bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedMedia.type === "image" ? (
                  <div className="relative w-full h-[70vh]">
                    <Image
                      src={selectedMedia.source}
                      alt={selectedMedia.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="relative w-full pb-[56.25%]">
                    <iframe
                      src={selectedMedia.source}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <div className="p-4 md:p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedMedia.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedMedia.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedia.categories.map((cat) => {
                      const category = MEDIA_CATEGORIES.find(
                        (c) => c.id === cat
                      )
                      return category ? (
                        <span
                          key={cat}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                        >
                          {category.name}
                        </span>
                      ) : null
                    })}
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {new Date(selectedMedia.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
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
