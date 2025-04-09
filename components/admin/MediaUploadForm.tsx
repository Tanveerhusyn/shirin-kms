"use client"

import React, { useState } from "react"
import Image from "next/image"
import { uploadAndCreateMediaItem } from "@/utils/uploadMedia"

// Media categories
const MEDIA_CATEGORIES = [
  { id: "culture", name: "Cultural Life" },
  { id: "landscapes", name: "Landscapes" },
  { id: "people", name: "People" },
  { id: "architecture", name: "Architecture" },
  { id: "festivals", name: "Festivals" },
  { id: "videos", name: "Videos" },
]

export default function MediaUploadForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<"image" | "video">("image")
  const [categories, setCategories] = useState<string[]>([])
  const [featured, setFeatured] = useState(false)
  const [videoSource, setVideoSource] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Handle file selection for main media file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview URL
      const fileUrl = URL.createObjectURL(selectedFile)
      setPreviewImage(fileUrl)
    }
  }

  // Handle file selection for thumbnail
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setThumbnailFile(selectedFile)

      // Create preview URL
      const fileUrl = URL.createObjectURL(selectedFile)
      setThumbnailPreview(fileUrl)
    }
  }

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    setCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId)
      } else {
        return [...prevCategories, categoryId]
      }
    })
  }

  // Reset the form
  const resetForm = () => {
    setTitle("")
    setDescription("")
    setType("image")
    setCategories([])
    setFeatured(false)
    setVideoSource("")
    setFile(null)
    setThumbnailFile(null)
    setPreviewImage(null)
    setThumbnailPreview(null)
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      // Validation
      if (!title) {
        throw new Error("Title is required")
      }

      if (categories.length === 0) {
        throw new Error("At least one category must be selected")
      }

      if (type === "image" && !file) {
        throw new Error("Please select an image file")
      }

      if (type === "video" && !videoSource && !file) {
        throw new Error(
          "Please provide a video source URL or upload a video file"
        )
      }

      // If it's a video with an external source, we still need a thumbnail
      if (type === "video" && videoSource && !thumbnailFile) {
        throw new Error("Please upload a thumbnail for the video")
      }

      // Create media item
      const result = await uploadAndCreateMediaItem(
        file!, // We've validated this above
        type === "video" ? thumbnailFile : null,
        {
          title,
          description,
          type,
          categories,
          featured,
          source: type === "video" && videoSource ? videoSource : undefined,
        }
      )

      if (result.error) {
        throw result.error
      }

      // Success
      setSubmitSuccess(true)
      resetForm()
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Upload New Media</h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-md">
          Media item successfully uploaded!
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          Error: {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Media Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Media Type *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={type === "image"}
                onChange={() => setType("image")}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
              />
              <span className="ml-2">Image</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={type === "video"}
                onChange={() => setType("video")}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
              />
              <span className="ml-2">Video</span>
            </label>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categories *
          </label>
          <div className="flex flex-wrap gap-2">
            {MEDIA_CATEGORIES.map((category) => (
              <label
                key={category.id}
                className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                  categories.includes(category.id)
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={categories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="sr-only"
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Featured item (appears in highlights)
            </span>
          </label>
        </div>

        {/* Media Source - conditional based on type */}
        {type === "image" ? (
          <div className="mb-4">
            <label
              htmlFor="imageFile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image File *
            </label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-emerald-50 file:text-emerald-700
                hover:file:bg-emerald-100"
              required
            />

            {previewImage && (
              <div className="mt-2">
                <div className="relative h-40 w-full max-w-md overflow-hidden rounded-md">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label
                htmlFor="videoSource"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Video URL (YouTube/Vimeo embed URL)
              </label>
              <input
                type="text"
                id="videoSource"
                value={videoSource}
                onChange={(e) => setVideoSource(e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                Or upload a video file below
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoFile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Video File
              </label>
              <input
                type="file"
                id="videoFile"
                accept="video/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-emerald-50 file:text-emerald-700
                  hover:file:bg-emerald-100"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Thumbnail Image *
              </label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-emerald-50 file:text-emerald-700
                  hover:file:bg-emerald-100"
                required={type === "video"}
              />

              {thumbnailPreview && (
                <div className="mt-2">
                  <div className="relative h-40 w-full max-w-md overflow-hidden rounded-md">
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Submit button */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={resetForm}
            className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            }`}
          >
            {isSubmitting ? "Uploading..." : "Upload Media"}
          </button>
        </div>
      </form>
    </div>
  )
}
