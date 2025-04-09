"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/utills/supabase/client"
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"

// Media item type definition
type MediaItem = {
  id: string
  title: string
  type: "image" | "video"
  thumbnail: string
  featured?: boolean
}

export default function MediaHubPreview() {
  const [featuredMedia, setFeaturedMedia] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch featured media from Supabase
  useEffect(() => {
    const fetchFeaturedMedia = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("media_items")
          .select("id, title, type, thumbnail")
          .eq("featured", true)
          .order("date", { ascending: false })
          .limit(4)

        if (error) {
          throw error
        }

        if (data) {
          setFeaturedMedia(data as MediaItem[])
        }
      } catch (err) {
        console.error("Error fetching featured media:", err)
        setError("Failed to load media preview.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedMedia()
  }, [])

  // Fallback media items if Supabase fails or returns empty
  const fallbackMedia = [
    {
      id: "preview-1",
      title: "Kamaris Valley Panorama",
      type: "image" as const,
      thumbnail: "/images/media-hub/kamaris-valley-thumb.jpg",
    },
    {
      id: "preview-2",
      title: "Harvest Festival Celebrations",
      type: "video" as const,
      thumbnail: "/images/media-hub/harvest-festival-thumb.jpg",
    },
    {
      id: "preview-3",
      title: "Stone Houses of Kamaris",
      type: "image" as const,
      thumbnail: "/images/media-hub/stone-houses-thumb.jpg",
    },
    {
      id: "preview-4",
      title: "Sunset Over Hunza Valley",
      type: "image" as const,
      thumbnail: "/images/media-hub/sunset-thumb.jpg",
    },
  ]

  // Use fetched media if available, otherwise fallback
  const displayMedia =
    featuredMedia.length > 0 && !error ? featuredMedia : fallbackMedia

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-8 mb-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        )}

        {/* Preview gallery grid */}
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {displayMedia.map((media, index) => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg aspect-square shadow-md"
              >
                <Image
                  src={media.thumbnail}
                  alt={media.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  {media.type === "video" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full">
                        <PlayIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-white text-sm font-medium line-clamp-2">
                      {media.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to action */}
        <div className="text-center">
          <Link
            href="/media-hub"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            View All Media
            <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
