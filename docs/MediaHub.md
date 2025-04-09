# Media Hub Module

## Overview
The Media Hub is an interactive gallery component that displays images and videos related to Kamaris village. It provides categorized media content with filtering, search capabilities, and a modal viewer for detailed viewing.

## Features
- **Media Filtering**: Users can filter content by category (Cultural Life, Landscapes, People, Architecture, Festivals, Videos)
- **Search Functionality**: Search through media titles and descriptions
- **Featured Content**: Highlighted featured media items for special content
- **Responsive Grid Layout**: Adapts to different screen sizes with a visually pleasing grid
- **Modal Viewer**: Immersive viewing experience for both images and videos
- **Video Support**: Embedded video playback (YouTube/Vimeo) with responsive player
- **Keyboard Accessibility**: Modal can be closed using ESC key
- **Animated Transitions**: Smooth animations between states using Framer Motion

## Implementation Details

### Component Structure
- `MediaHub.tsx`: Main component with filtering, search, and modal viewing
- `MediaHubPreview.tsx`: Homepage preview component showing featured content

### Media Data Structure
Each media item includes:
- Unique ID
- Title and description
- Media type (image or video)
- Thumbnail image path
- Source path (full image or video embed URL)
- Categories for filtering
- Date for sorting and display
- Featured flag for highlighting important content

### Tools and Libraries
- Next.js Image component for optimized image loading
- Framer Motion for animations and transitions
- Headless UI for accessible UI components
- Heroicons for iconography

## Future Enhancements
- Pagination for large media collections
- Download functionality for images
- Share functionality for social media
- Slideshow/carousel view option
- Advanced filtering (date ranges, multiple categories)
- User-generated content submission
- Related media suggestions 