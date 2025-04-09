"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utills/supabase/client"

import MediaUploadForm from "@/components/admin/MediaUploadForm"

export default function AdminMediaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Check authentication status
  React.useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          throw new Error("Authentication failed")
        }

        if (data.user) {
          // Check if user is in admin list or has admin role
          // This is a simplified check; you should implement proper role checks
          const { data: adminData, error: adminError } = await supabase
            .from("admin_users")
            .select("*")
            .eq("user_id", data.user.id)
            .maybeSingle()

          if (adminError) {
            throw new Error("Error checking admin status")
          }

          if (adminData) {
            setIsAuthenticated(true)
          } else {
            throw new Error("Not authorized to access admin area")
          }
        } else {
          throw new Error("Please sign in to access admin area")
        }
      } catch (err) {
        console.error("Auth error:", err)
        setError(err instanceof Error ? err.message : "Authentication error")
        setIsAuthenticated(false)

        // Redirect to login page after a delay
        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-500">Verifying your credentials...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-gray-500 text-sm">Redirecting to login page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          <p className="mt-2 text-gray-600">
            Upload and manage media content for Kamaris
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Media Items</h2>
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center"
            >
              Back to Admin Dashboard
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            Use the form below to add new media items to the Media Hub. Images
            and videos uploaded here will be available in the Media Hub gallery
            for visitors to view.
          </p>
        </div>

        <MediaUploadForm />
      </div>
    </div>
  )
}
