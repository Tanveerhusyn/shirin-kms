import { createClient } from "@/utills/supabase/client"

/**
 * Uploads a file to Supabase Storage and returns the public URL
 * @param file - The file to upload
 * @param bucket - The storage bucket name
 * @param path - The path within the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadMediaFile(
  file: File,
  bucket: string = "media",
  path: string = ""
): Promise<{ publicUrl: string; error: Error | null }> {
  try {
    const supabase = createClient()

    // Create a unique file name to avoid collisions
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}.${fileExt}`
    const fullPath = path ? `${path}/${fileName}` : fileName

    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      throw error
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data?.path || fullPath)

    return { publicUrl, error: null }
  } catch (error) {
    console.error("Error uploading file:", error)
    return {
      publicUrl: "",
      error:
        error instanceof Error
          ? error
          : new Error("Unknown error during upload"),
    }
  }
}

/**
 * Creates a new media item in the database
 * @param mediaItem - The media item to create
 * @returns The created media item or error
 */
export async function createMediaItem(mediaItem: {
  title: string
  description: string
  type: "image" | "video"
  thumbnail: string
  source: string
  categories: string[]
  featured?: boolean
}) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("media_items")
      .insert(mediaItem)
      .select()
      .single()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error creating media item:", error)
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error("Unknown error creating media item"),
    }
  }
}

/**
 * Wrapper function to handle file upload and media item creation
 * @param file - The file to upload
 * @param thumbnailFile - The thumbnail file to upload
 * @param mediaDetails - The media item details
 * @returns The created media item
 */
export async function uploadAndCreateMediaItem(
  file: File,
  thumbnailFile: File | null,
  mediaDetails: {
    title: string
    description: string
    type: "image" | "video"
    categories: string[]
    featured?: boolean
    source?: string // Optional for videos that use external hosting
  }
) {
  try {
    // For videos with external sources, we don't need to upload the video file
    const isExternalVideo =
      mediaDetails.type === "video" &&
      mediaDetails.source &&
      mediaDetails.source.startsWith("http")

    // Upload the main file if it's an image or a self-hosted video
    const fileUploadResult = isExternalVideo
      ? { publicUrl: mediaDetails.source as string, error: null }
      : await uploadMediaFile(
          file,
          "media",
          mediaDetails.type === "image" ? "images" : "videos"
        )

    if (fileUploadResult.error) {
      throw fileUploadResult.error
    }

    // Upload the thumbnail (or use the same image for images)
    const thumbnailUploadResult = thumbnailFile
      ? await uploadMediaFile(thumbnailFile, "media", "thumbnails")
      : mediaDetails.type === "image"
      ? fileUploadResult // For images, use the same image as thumbnail
      : { publicUrl: "", error: new Error("Thumbnail required for videos") }

    if (thumbnailUploadResult.error) {
      throw thumbnailUploadResult.error
    }

    // Create the media item
    const { data, error } = await createMediaItem({
      title: mediaDetails.title,
      description: mediaDetails.description,
      type: mediaDetails.type,
      source: fileUploadResult.publicUrl,
      thumbnail: thumbnailUploadResult.publicUrl,
      categories: mediaDetails.categories,
      featured: mediaDetails.featured,
    })

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error in upload and create:", error)
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error("Unknown error in upload process"),
    }
  }
}
