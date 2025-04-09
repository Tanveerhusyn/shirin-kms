import React from "react"
import Link from "next/link"
import { getAllBlogPosts, getAllBlogTags } from "@/utils/blogUtils"

import BlogList from "@/components/local-life/BlogList"
import LocalLifeShowcase from "@/components/local-life/LocalLifeShowcase"

export const metadata = {
  title: "Local Life | Kamaris",
  description:
    "Explore the traditional lifestyle, ceremonies, and daily practices of Kamaris through our cultural blog.",
}

export const revalidate = 3600 // Revalidate this page every hour

export default async function LocalLifePage({
  searchParams,
}: {
  searchParams: { tag?: string }
}) {
  // Get the selected tag from the query parameters
  const selectedTag = searchParams.tag

  // Fetch blog posts from the server
  const posts = await getAllBlogPosts({
    tag: selectedTag,
    orderBy: "published_date",
    orderDirection: "desc",
  })

  // Fetch all unique tags
  const tags = await getAllBlogTags()

  // Get featured posts for the top section
  const featuredPosts = posts.filter((post) => post.featured)

  return (
    <main className="flex-grow">
      {/* Header */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-sm font-medium text-emerald-600 tracking-wide uppercase flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              CULTURAL TRADITIONS & DAILY LIFE
            </h2>
            <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Local Life in Kamaris
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the rich traditions, ceremonies, and daily practices
              that have shaped the cultural identity of Kamaris for generations.
            </p>
          </div>
        </div>
      </section>

      {/* Cultural Showcase Section */}
      <LocalLifeShowcase />

      {/* Blog Section Header */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-medium text-emerald-600 tracking-wide uppercase flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              STORIES & ARTICLES
            </h2>
            <h3 className="mt-3 text-3xl font-bold text-gray-900">
              Local Life Journal
            </h3>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover in-depth articles and stories about the culture,
              traditions, and daily life in Kamaris, written by community
              members and cultural researchers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Articles
            </h2>
            <BlogList initialPosts={featuredPosts} featuredOnly={true} />
          </div>
        </section>
      )}

      {/* Filter by Tag + All Blog Posts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              {selectedTag ? `Articles tagged: ${selectedTag}` : "All Articles"}
            </h2>

            {/* Simple Tag Filters */}
            <div className="flex flex-wrap gap-2">
              {selectedTag && (
                <Link
                  href="/local-life"
                  className="inline-flex items-center text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Clear filter
                </Link>
              )}

              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/local-life?tag=${encodeURIComponent(tag)}`}
                  className={`inline-flex items-center text-sm px-3 py-1.5 rounded-full transition-colors ${
                    selectedTag === tag
                      ? "bg-emerald-100 text-emerald-800 font-medium"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <BlogList initialPosts={posts} selectedTag={selectedTag} />
        </div>
      </section>
    </main>
  )
}
