"use client"

import { useEffect, useRef, useState } from "react"
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  Compass,
  Info,
  Map as MapIcon,
  MapPin,
  Mountain,
} from "lucide-react"

// Kamaris village location in Gulmit, Hunza
const KAMARIS_LOCATION = {
  lat: 36.3922,
  lng: 74.8537,
}

// Key locations in and around Kamaris
const KEY_LOCATIONS = [
  {
    id: "kamaris",
    name: "Kamaris Village",
    position: { lat: 36.3922, lng: 74.8537 },
    description:
      "The picturesque hamlet offering panoramic views of Hunza Valley",
    color: "#047857", // emerald-700
    icon: "🏡",
    listIcon: "/icons/home-icon.svg",
  },
  {
    id: "gulmit",
    name: "Gulmit Village",
    position: { lat: 36.388234, lng: 74.862808 },
    description: "The gateway village to Kamaris, with hotels and amenities",
    color: "#0284c7", // sky-600
    icon: "🏘️",
    listIcon: "/icons/village-icon.svg",
  },
  {
    id: "attabad",
    name: "Attabad Lake",
    position: { lat: 36.350226, lng: 74.859583 },
    description: "Stunning turquoise lake visible from Kamaris viewpoints",
    color: "#0ea5e9", // sky-500
    icon: "💧",
    listIcon: "/icons/lake-icon.svg",
  },
  {
    id: "shatubar",
    name: "Shatubar Pasture",
    position: { lat: 36.384334, lng: 74.812217 },
    description: "Beautiful alpine pasture with stunning mountain views",
    color: "#60a5fa", // blue-400
    icon: "🏔️",
    listIcon: "/icons/mountain-icon.svg",
  },
  {
    id: "borith",
    name: "Borith Lake",
    position: { lat: 36.429853, lng: 74.864081 },
    description: "Serene lake along the trekking path from Kamaris",
    color: "#2dd4bf", // teal-400
    icon: "💧",
    listIcon: "/icons/lake-icon.svg",
  },
  {
    id: "hussaini",
    name: "Hussaini Suspension Bridge",
    position: { lat: 36.422695, lng: 74.881068 },
    description: "Famous suspension bridge, part of the trek from Kamaris",
    color: "#f59e0b", // amber-500
    icon: "🌉",
    listIcon: "/icons/bridge-icon.svg",
  },
]

// Map styling options
const MAP_STYLES = [
  {
    id: "standard",
    name: "Standard View",
    mapTypeId: "roadmap",
    icon: <MapIcon size={18} />,
  },
  {
    id: "satellite",
    name: "Satellite View",
    mapTypeId: "satellite",
    icon: <Compass size={18} />,
  },
  {
    id: "terrain",
    name: "Terrain View",
    mapTypeId: "terrain",
    icon: <Mountain size={18} />,
  },
]

// Custom map styling - Subtle Earth tones
const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b9d3c2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
]

export default function VillageMapExperience() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [mapStyle, setMapStyle] = useState("satellite")
  const [showStyleOptions, setShowStyleOptions] = useState(false)
  const mapRef = useRef<google.maps.Map | null>(null)
  const [isMapInfoOpen, setIsMapInfoOpen] = useState(true)

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: ["places"],
  })

  // Handle location selection
  const selectLocation = (locationId: string) => {
    // Set the selected location in state
    setSelectedLocation(locationId)
    const location = KEY_LOCATIONS.find((loc) => loc.id === locationId)

    if (location && mapRef.current) {
      // Animate map to center on the selected location
      mapRef.current.panTo(location.position)
      mapRef.current.setZoom(15)
    }
  }

  // Handle map style change
  const changeMapStyle = (styleId: string) => {
    setMapStyle(styleId)
    setShowStyleOptions(false)
  }

  // Set up map options
  const getMapOptions = () => {
    const style = MAP_STYLES.find((s) => s.id === mapStyle)

    return {
      center: KAMARIS_LOCATION,
      zoom: 13,
      mapTypeId: style?.mapTypeId || "roadmap",
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      styles: mapStyle === "standard" ? customMapStyle : undefined,
    }
  }

  // Handle map load
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map

    // Close style options when map is clicked
    map.addListener("click", () => {
      if (showStyleOptions) {
        setShowStyleOptions(false)
      }
    })

    // Select Kamaris by default after map loads
    setTimeout(() => {
      selectLocation("kamaris")
    }, 1000)
  }

  // Create custom marker icon style
  const getMarkerIcon = (
    location: (typeof KEY_LOCATIONS)[0],
    isSelected: boolean
  ) => {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: location.color,
      fillOpacity: 0.9,
      strokeWeight: 2,
      strokeColor: "#ffffff",
      scale: isSelected ? 10 : 8,
      labelOrigin: new google.maps.Point(0, -15),
    }
  }

  // Close map info panel after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapInfoOpen(false)
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
        <p className="text-gray-800 text-xl">Error loading maps</p>
      </div>
    )
  }

  const selectedLocationData = selectedLocation
    ? KEY_LOCATIONS.find((loc) => loc.id === selectedLocation)
    : null

  return (
    <section
      className="py-16 bg-gradient-to-b from-white to-gray-50"
      id="explore-kamaris"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 mb-4"
          >
            <MapPin size={16} />
            <span className="text-sm font-medium">DISCOVER OUR LOCATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Where to Find Kamaris
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            Nestled atop Gulmit village in the Gojal region of Upper Hunza,
            Kamaris offers panoramic views of the surrounding landscapes,
            including Attabad Lake and the broader Gulmit valley.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit"
          >
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800">
                Explore Key Locations
              </h3>
            </div>

            <div className="divide-y divide-gray-100">
              {KEY_LOCATIONS.map((location) => (
                <button
                  key={location.id}
                  onClick={() => selectLocation(location.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                    selectedLocation === location.id
                      ? "bg-emerald-50 hover:bg-emerald-50"
                      : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white`}
                    style={{ backgroundColor: location.color }}
                  >
                    <span className="text-lg">{location.icon}</span>
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        selectedLocation === location.id
                          ? "text-emerald-700"
                          : "text-gray-800"
                      }`}
                    >
                      {location.name}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {location.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 rounded-xl overflow-hidden shadow-sm border border-gray-100 relative h-[600px]"
          >
            {isLoaded && (
              <>
                {/* Map Style Selector */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="relative">
                    <button
                      onClick={() => setShowStyleOptions(!showStyleOptions)}
                      className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm text-gray-700 border border-gray-200"
                    >
                      {MAP_STYLES.find((s) => s.id === mapStyle)?.icon}
                      <span className="text-sm font-medium">
                        {MAP_STYLES.find((s) => s.id === mapStyle)?.name}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          showStyleOptions ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {showStyleOptions && (
                      <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-md border border-gray-200 w-full">
                        {MAP_STYLES.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => changeMapStyle(style.id)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full text-left text-sm"
                          >
                            {style.icon}
                            <span>{style.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Map Info Panel */}
                <AnimatePresence>
                  {isMapInfoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-4 left-4 right-4 mx-auto max-w-md bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-10 border border-white/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-full text-emerald-700">
                          <Info size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            Welcome to Kamaris
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Explore our village by clicking on the markers or
                            selecting a location from the list. You can also
                            change the map style using the selector in the top
                            right.
                          </p>
                        </div>
                        <button
                          onClick={() => setIsMapInfoOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ChevronDown size={20} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Google Map with React Markers */}
                <div
                  style={{ width: "100%", height: "100%" }}
                  className="google-map"
                >
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={getMapOptions()}
                    onLoad={onMapLoad}
                  >
                    {KEY_LOCATIONS.map((location) => (
                      <Marker
                        key={location.id}
                        position={location.position}
                        title={location.name}
                        onClick={() => selectLocation(location.id)}
                        animation={
                          selectedLocation === location.id
                            ? google.maps.Animation.BOUNCE
                            : undefined
                        }
                        icon={getMarkerIcon(
                          location,
                          selectedLocation === location.id
                        )}
                        label={
                          selectedLocation === location.id
                            ? {
                                text: location.name,
                                color: "#333333",
                                fontWeight: "bold",
                                fontSize: "12px",
                              }
                            : undefined
                        }
                      />
                    ))}
                  </GoogleMap>
                </div>
              </>
            )}

            {/* Loading state */}
            {!isLoaded && (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Selected Location Details */}
        <AnimatePresence>
          {selectedLocationData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white`}
                  style={{ backgroundColor: selectedLocationData.color }}
                >
                  <span className="text-lg">{selectedLocationData.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedLocationData.name}
                  </h3>
                  <p className="text-gray-600">
                    {selectedLocationData.description}
                  </p>

                  {selectedLocationData.id === "kamaris" && (
                    <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <h4 className="font-medium text-emerald-800 mb-2">
                        Getting to Kamaris
                      </h4>
                      <p className="text-emerald-700 text-sm">
                        Accessible via a road leading from Gulmit, culminating
                        in a 15-20 minute walk that rewards visitors with
                        breathtaking vistas of the Hunza Valley.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
