# Supabase Integration in Media Hub

## Overview
The Media Hub module has been integrated with Supabase to provide a robust backend for media storage and retrieval. This integration enables dynamic loading of media content, user-generated uploads, and secure management of media assets.

## Components and Features

### 1. Database Structure
- **media_items Table**: Stores metadata for all media items (images and videos)
  - Fields include: id, title, description, type, thumbnail, source, categories, date, featured, created_at, updated_at
  - Categories stored as array type for efficient filtering
  - Row-level security policies for controlled access

### 2. Storage Buckets
- **media Bucket**: Organized with subdirectories for different media types
  - `/images`: For full-size images
  - `/videos`: For self-hosted video files
  - `/thumbnails`: For video thumbnails and image previews

### 3. Data Fetching Implementations
- **MediaHub Component**: Fetches and displays all media items with filtering capabilities
- **MediaHubPreview Component**: Loads featured media items for the homepage preview

### 4. Media Administration
- **MediaUploadForm Component**: Provides a UI for authenticated users to upload new media
- **Admin Media Page**: Secure area for authorized users to manage media content

### 5. Helper Utilities
- **uploadMedia.ts**: Contains utility functions for media file uploads and database operations
- **supabase/client.ts**: Client-side Supabase instance configuration

## Security and Permissions
- Anonymous users have read-only access to media items
- Authentication required for all media uploads and modifications
- Admin role verification for access to media management screens
- Row-level security policies in Supabase control data access

## Migration and Setup

### Initial Setup
1. Create a Supabase project
2. Set environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### Database Migration
Run the provided migration script: `supabase/migrations/20240410_create_media_items.sql`

### Storage Setup
1. Create a new bucket named "media"
2. Create the following folder structure:
   - `/images`
   - `/videos`
   - `/thumbnails`
3. Set up appropriate storage policies

## Usage Examples

### Fetching Media
```typescript
const supabase = createClient();
const { data, error } = await supabase
  .from('media_items')
  .select('*')
  .order('date', { ascending: false });
```

### Uploading Media
```typescript
// See utils/uploadMedia.ts for complete implementation
const { data, error } = await uploadAndCreateMediaItem(
  file,
  thumbnailFile,
  {
    title: "Image Title",
    description: "Image Description",
    type: "image",
    categories: ["landscapes"]
  }
);
```

## Future Enhancements
- Media batch upload capabilities
- Media editing and deletion interfaces
- Advanced search with full-text search
- Image processing (resizing, compression, format conversion)
- Analytics tracking for media views and engagement 