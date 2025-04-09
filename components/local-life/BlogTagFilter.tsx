"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface BlogTagFilterProps {
  tags: string[]
  selectedTag?: string
}

export default function BlogTagFilter({
  tags,
  selectedTag,
}: BlogTagFilterProps) {
  const router = useRouter()

  // Clear the selected tag
  const clearTag = () => {
    router.push("/local-life")
  }

  // Sort tags alphabetically
  const sortedTags = [...tags].sort()

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 md:justify-end">
        {/* Show a "clear" button if a tag is selected */}
        {selectedTag && (
          <button
            onClick={clearTag}
            className="inline-flex items-center text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Clear filter
          </button>
        )}

        {/* Tag list */}
        <div className="flex flex-wrap gap-2">
          {sortedTags.map((tag) => (
            <Link
              key={tag}
              href={`/local-life?tag=${encodeURIComponent(tag)}`}
              className={`inline-flex items-center text-sm px-3 py-1.5 rounded-full transition-colors ${
                selectedTag === tag
                  ? "bg-emerald-100 text-emerald-800 font-medium"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <TagIcon className="h-4 w-4 mr-1" />
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
