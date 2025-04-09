"use client"

import { useState } from "react"
import { mapConfig } from "@/providers/map-provider"
import { GoogleMap, InfoWindow } from "@react-google-maps/api"

import { Marker, MarkerProps } from "./marker"

export type MapProps = {
  center?: { lat: number; lng: number }
  zoom?: number
  mapTypeId?: string
  styles?: google.maps.MapTypeStyle[] | null
  markers?: Array<{
    id: string
    position: { lat: number; lng: number }
    title?: string
    icon?: string
    visible?: boolean
    category?: string
    yearAdded?: number
    isNew?: boolean
  }>
  onMarkerClick?: (markerId: string) => void
  onBoundsChanged?: () => void
  onClick?: (e: google.maps.MapMouseEvent) => void
  onCenterChanged?: () => void
  onZoomChanged?: () => void
  height?: string
  width?: string
  options?: google.maps.MapOptions
  className?: string
}

export function MapComponent({
  center,
  zoom,
  mapTypeId,
  styles,
  markers = [],
  onMarkerClick,
  onBoundsChanged,
  onClick,
  onCenterChanged,
  onZoomChanged,
  height = "400px",
  width = "100%",
  options,
  className,
}: MapProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)
  const [infoPosition, setInfoPosition] =
    useState<google.maps.LatLngLiteral | null>(null)

  // Set default values from mapConfig if not provided
  const mapCenter = center || mapConfig.defaultCenter
  const mapZoom = zoom || mapConfig.defaultZoom
  const mapStyles = styles === undefined ? mapConfig.styles.modern : styles

  // Handle marker click
  const handleMarkerClick = (markerId: string) => {
    const marker = markers.find((m) => m.id === markerId)
    if (marker) {
      setSelectedMarker(markerId)
      setInfoPosition(marker.position)
      if (onMarkerClick) {
        onMarkerClick(markerId)
      }
    }
  }

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={{ width, height }}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: mapStyles,
          mapTypeId,
          ...options,
        }}
        onBoundsChanged={onBoundsChanged}
        onClick={onClick}
        onCenterChanged={onCenterChanged}
        onZoomChanged={onZoomChanged}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            id={marker.id}
            position={marker.position}
            title={marker.title}
            icon={marker.icon}
            visible={marker.visible !== false}
            onClick={handleMarkerClick}
            highlighted={selectedMarker === marker.id}
            category={marker.category}
            isNew={marker.isNew}
          />
        ))}

        {selectedMarker && infoPosition && (
          <InfoWindow
            position={infoPosition}
            onCloseClick={() => {
              setSelectedMarker(null)
              setInfoPosition(null)
            }}
          >
            <div className="max-w-xs p-2">
              <h3 className="text-lg font-bold">
                {markers.find((m) => m.id === selectedMarker)?.title}
              </h3>
              <div className="mt-2">
                <button
                  onClick={() => {
                    // This will keep the info window open but allow additional actions
                    if (onMarkerClick) {
                      onMarkerClick(selectedMarker)
                    }
                  }}
                  className="text-sm text-emerald-600 font-medium"
                >
                  View details and stories
                </button>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
