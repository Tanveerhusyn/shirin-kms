"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getAllBlogPosts, type BlogPost } from "@/utils/blogUtils"
import { CalendarIcon, ClockIcon, TagIcon } from "@heroicons/react/24/outline"

interface BlogListProps {
  initialPosts?: BlogPost[]
  selectedTag?: string
  featuredOnly?: boolean
  limit?: number
}

export default function BlogList({
  initialPosts,
  selectedTag,
  featuredOnly = false,
  limit,
}: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || [])
  const [isLoading, setIsLoading] = useState(!initialPosts)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Skip fetching if initial posts were provided
    if (initialPosts) return

    const fetchPosts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const fetchedPosts = await getAllBlogPosts({
          tag: selectedTag,
          featured: featuredOnly ? true : undefined,
          limit,
        })
        setPosts(fetchedPosts)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [initialPosts, selectedTag, featuredOnly, limit])

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">
          {selectedTag
            ? `No blog posts found with tag "${selectedTag}".`
            : "No blog posts found."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          href={`/local-life/${post.slug}`}
          key={post.id}
          className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative w-full h-48">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {post.featured && (
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                Featured
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {post.title}
            </h3>

            <div className="flex items-center mt-3 text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{formatDate(post.published_date)}</span>
              {post.read_time_minutes && (
                <>
                  <span className="mx-2">•</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{post.read_time_minutes} min read</span>
                </>
              )}
            </div>

            <p className="mt-3 text-gray-600 line-clamp-3">{post.summary}</p>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500 self-end ml-1">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="px-6 pb-6 mt-auto">
            <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors inline-flex items-center">
              Read more
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
