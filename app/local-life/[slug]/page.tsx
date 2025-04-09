import React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/utils/blogUtils"
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline"

import BlogList from "@/components/local-life/BlogList"

export const revalidate = 3600 // Revalidate this page every hour

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found | Kamaris",
      description: "The requested blog post could not be found",
    }
  }

  return {
    title: `${post.title} | Local Life | Kamaris`,
    description: post.summary,
  }
}

// Generate static paths for the most common blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts({ limit: 10 })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  // If the post doesn't exist, show the 404 page
  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = await getRelatedBlogPosts(post, 3)

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <main className="flex-grow">
      {/* Featured Image */}
      <div className="relative w-full h-64 md:h-96">
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Content Container */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Post Header */}
          <div className="px-6 pt-6 md:px-10 md:pt-10">
            <Link
              href="/local-life"
              className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors mb-6"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to all articles
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center text-sm text-gray-600 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{formatDate(post.published_date)}</span>
              </div>

              {post.read_time_minutes && (
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{post.read_time_minutes} min read</span>
                </div>
              )}

              <div className="flex items-center">
                <span className="font-medium">By {post.author}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/local-life?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded hover:bg-emerald-100 transition-colors"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-emerald max-w-none px-6 py-10 md:px-10 md:py-12">
            {post.content_type === "html" ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              // For markdown content, add a client component wrapper later
              <div className="markdown-content">
                {/* Simple processing of markdown content */}
                {post.content.split("\n").map((line, index) => {
                  // Handle headers
                  if (line.startsWith("# ")) {
                    return (
                      <h1 key={index} className="text-3xl font-bold my-4">
                        {line.substring(2)}
                      </h1>
                    )
                  } else if (line.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold my-3">
                        {line.substring(3)}
                      </h2>
                    )
                  } else if (line.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-bold my-2">
                        {line.substring(4)}
                      </h3>
                    )
                  } else if (line.startsWith("> ")) {
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 border-gray-300 pl-4 italic my-4"
                      >
                        {line.substring(2)}
                      </blockquote>
                    )
                  } else if (line.startsWith("- ")) {
                    return (
                      <li key={index} className="ml-6 my-1">
                        {line.substring(2)}
                      </li>
                    )
                  } else if (line.startsWith("![")) {
                    // Extract image details
                    const altEnd = line.indexOf("](")
                    const srcEnd = line.indexOf(")", altEnd)
                    if (altEnd > 2 && srcEnd > altEnd) {
                      const alt = line.substring(2, altEnd)
                      const src = line.substring(altEnd + 2, srcEnd)
                      return (
                        <div key={index} className="my-6">
                          <img
                            src={src}
                            alt={alt}
                            className="w-full rounded-md"
                          />
                        </div>
                      )
                    }
                  } else if (line === "") {
                    return <br key={index} />
                  }

                  // Default paragraph
                  return (
                    <p key={index} className="my-2">
                      {line}
                    </p>
                  )
                })}
              </div>
            )}
          </div>
        </article>

        {/* Author Bio (optional) */}
        <div className="bg-emerald-50 rounded-lg p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            About the Author
          </h2>
          <p className="mt-2 text-gray-600">
            {post.author} is a contributor to the Kamaris local life
            documentation project, focusing on preserving and sharing the rich
            cultural heritage of the region.
          </p>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-50 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <BlogList initialPosts={relatedPosts} />
          </div>
        </section>
      )}
    </main>
  )
}
