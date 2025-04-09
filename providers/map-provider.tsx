//Since the map will be laoded and displayed on client side
"use client"

// Import necessary modules and functions from external libraries and our own project
import { ReactNode } from "react"
import { LoadScript, LoadScriptProps } from "@react-google-maps/api"

// Define the libraries we'll need from Google Maps
const libraries: LoadScriptProps["libraries"] = [
  "places",
  "drawing",
  "geometry",
]

// Map configuration options for the entire application
export const mapConfig = {
  defaultCenter: { lat: 36.3920805, lng: 74.853502 }, // Coordinates for Shirin Kamaris village
  defaultZoom: 17,
  minZoom: 10,
  maxZoom: 21,
  styles: {
    modern: [],
    historical: [
      { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#c9b2a6" }],
      },
      // Additional map styles can be defined here
    ],
  },
  mapOptions: {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  },
}

// MapProvider component that loads the Google Maps script
export function MapProvider({ children }: { children: ReactNode }) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
      libraries={libraries}
      loadingElement={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      }
    >
      {children}
    </LoadScript>
  )
}

// Export default time period styles
export const timePeriodStyles = {
  historic: {
    filterClass: "bg-sepia bg-opacity-40 mix-blend-multiply",
    mapStyle: "historical",
  },
  modern: {
    filterClass: "",
    mapStyle: "modern",
  },
}
