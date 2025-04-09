#!/usr/bin/env node

// Import required libraries
const { createClient } = require("@supabase/supabase-js")
require("dotenv").config()

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing required environment variables:")
  console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓" : "✗")
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✓" : "✗")
  process.exit(1)
}

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to test connection and read from media_items table
async function testConnection() {
  try {
    console.log("Testing Supabase connection...")

    // Test simple query to check connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from("media_items")
      .select("count(*)", { count: "exact" })

    if (connectionError) {
      console.error("Connection error:", connectionError)
      process.exit(1)
    }

    console.log("✅ Connection successful!")

    // Get count of media items
    const { count } = await supabase
      .from("media_items")
      .select("*", { count: "exact", head: true })

    console.log(`✅ Media items table exists with ${count} records`)

    // Fetch a sample of media items
    const { data: sampleItems, error: fetchError } = await supabase
      .from("media_items")
      .select("id, title, type")
      .limit(5)

    if (fetchError) {
      console.error("Error fetching items:", fetchError)
    } else {
      console.log("\nSample media items:")
      console.table(sampleItems)
    }

    console.log("\nDatabase connection test completed successfully!")
  } catch (error) {
    console.error("Unexpected error:", error)
    process.exit(1)
  }
}

// Run the test
testConnection()
