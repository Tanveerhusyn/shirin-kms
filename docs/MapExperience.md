# Map Experience Documentation

## Overview

The Map Experience is an interactive feature that showcases key locations in the Kamaris region through a visually engaging and responsive interface. It uses custom SVG markers to represent different types of locations (villages, lakes, glaciers, bridges) and provides detailed information about each point of interest when clicked.

## Components and Features

### Custom SVG Markers

The map implements custom-designed SVG markers to enhance visual identity and improve user experience:

1. **Village Marker** (`public/icons/village-marker.svg`)
   - Sky blue color scheme
   - House icon representation
   - Drop shadow for depth

2. **Lake Marker** (`public/icons/lake-marker.svg`)
   - Blue color scheme
   - Wave pattern design
   - Drop shadow for depth

3. **Glacier Marker** (`public/icons/glacier-marker.svg`)
   - Light blue color scheme
   - Mountain/ice formation design
   - Drop shadow for depth

4. **Bridge Marker** (`public/icons/bridge-marker.svg`)
   - Amber color scheme
   - Bridge element design
   - Drop shadow for depth

### Interactive Elements

The map includes several interactive elements to enhance user engagement:

1. **Hover Effects**
   - Markers scale up slightly on hover
   - Tooltip displays location name
   - Subtle animation for visual feedback

2. **Click Interactions**
   - Opens a detailed information panel
   - Displays images, descriptions, and historical context
   - Smooth animation transitions

3. **Responsive Design**
   - Adapts to different screen sizes
   - Mobile-friendly touch interactions
   - Adjusts information display based on device

## Implementation Details

### Core Components

1. **VillageMapExperience** (`components/map/VillageMapExperience.tsx`)
   - Main container component for the map experience
   - Handles state management and user interactions
   - Integrates with animation libraries

2. **MapMarker** (`components/map/MapMarker.tsx`)
   - Renders the appropriate SVG marker based on location type
   - Manages hover and click states
   - Handles animation effects

3. **LocationInfoPanel** (`components/map/LocationInfoPanel.tsx`)
   - Displays detailed information about selected locations
   - Manages content rendering and animations
   - Supports media display (images/videos)

### Data Structure

Location data follows this structure:

```typescript
interface Location {
  id: string;
  name: string;
  type: 'village' | 'lake' | 'glacier' | 'bridge';
  coordinates: {
    x: number;
    y: number;
  };
  description: string;
  images: string[];
  historicalContext?: string;
}
```

### Animation Implementation

The map uses Framer Motion for animations, including:

1. **Marker Animations**
   - Scale animations on hover
   - Bounce effect on appearance
   - Smooth transitions between states

2. **Panel Animations**
   - Slide-in effect when opening information panels
   - Fade transitions for content
   - Staggered animations for list items

## Usage Example

To implement the map in a page:

```jsx
import VillageMapExperience from '@/components/map/VillageMapExperience';

export default function MapPage() {
  return (
    <div className="w-full h-screen">
      <VillageMapExperience />
    </div>
  );
}
```

## Performance Considerations

1. **SVG Optimization**
   - All SVG markers are optimized for file size
   - Efficient rendering through React components
   - Lazy loading for off-screen markers

2. **Interaction Handling**
   - Debounced event handlers for scroll and resize
   - Efficient state updates to prevent re-renders
   - Memory management for media assets

## Security and Permissions

- Map data is publicly accessible
- Media assets are served from secure, optimized CDN
- User interactions are not stored or tracked

## Future Enhancements

1. **3D Integration**
   - Enhanced 3D models for landmarks
   - Perspective view options

2. **Advanced Filtering**
   - Filter locations by type, distance, or relevance
   - Search functionality for specific locations

3. **User Contributions**
   - Allow users to suggest new locations
   - Community ratings and reviews for locations

4. **AR Features**
   - Augmented reality view for mobile devices
   - Real-world navigation integration 