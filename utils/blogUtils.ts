import { createClient } from "@/utills/supabase/client"

export type BlogPost = {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  content_type: "markdown" | "html"
  featured_image: string
  author: string
  published_date: string
  tags: string[]
  status: "draft" | "published"
  read_time_minutes: number | null
  featured: boolean
  created_at?: string
  updated_at?: string
}

/**
 * Fetch all published blog posts
 * @param options Query options
 * @returns Array of blog posts
 */
export async function getAllBlogPosts(
  options: {
    limit?: number
    tag?: string
    featured?: boolean
    orderBy?: string
    orderDirection?: "asc" | "desc"
  } = {}
) {
  const {
    limit = 100,
    tag,
    featured,
    orderBy = "published_date",
    orderDirection = "desc",
  } = options

  try {
    const supabase = createClient()

    let query = supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order(orderBy, { ascending: orderDirection === "asc" })

    if (tag) {
      query = query.contains("tags", [tag])
    }

    if (featured !== undefined) {
      query = query.eq("featured", featured)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return data as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

/**
 * Fetch a single blog post by slug
 * @param slug Post slug
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()

    if (error) {
      throw error
    }

    return data as BlogPost
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch featured blog posts
 * @param limit Maximum number of posts to return
 * @returns Array of featured blog posts
 */
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  return getAllBlogPosts({
    featured: true,
    limit,
    orderBy: "published_date",
    orderDirection: "desc",
  })
}

/**
 * Get all unique tags from published blog posts
 * @returns Array of unique tags
 */
export async function getAllBlogTags(): Promise<string[]> {
  try {
    const posts = await getAllBlogPosts()
    const allTags = posts.flatMap((post) => post.tags)
    const uniqueTags = Array.from(new Set(allTags))
    return uniqueTags
  } catch (error) {
    console.error("Error fetching blog tags:", error)
    return []
  }
}

/**
 * Get related blog posts based on shared tags
 * @param currentPost Current blog post
 * @param limit Maximum number of related posts to return
 * @returns Array of related blog posts
 */
export async function getRelatedBlogPosts(
  currentPost: BlogPost,
  limit = 3
): Promise<BlogPost[]> {
  try {
    // Get all posts
    const allPosts = await getAllBlogPosts()

    // Filter out the current post
    const otherPosts = allPosts.filter((post) => post.id !== currentPost.id)

    // Calculate relatedness score based on shared tags
    const postsWithScore = otherPosts.map((post) => {
      const sharedTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      ).length

      return {
        post,
        score: sharedTags,
      }
    })

    // Sort by score (descending) and take the top 'limit' posts
    const relatedPosts = postsWithScore
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.post)

    return relatedPosts
  } catch (error) {
    console.error("Error fetching related blog posts:", error)
    return []
  }
}
