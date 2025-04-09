"use client"

import { useEffect, useState } from "react"
import { Marker as GoogleMapMarker } from "@react-google-maps/api"

export type MarkerProps = {
  id: string
  position: {
    lat: number
    lng: number
  }
  icon?: string
  title?: string
  visible?: boolean
  zIndex?: number
  onClick?: (markerId: string) => void
  animation?: google.maps.Animation
  label?: string | google.maps.MarkerLabel
  opacity?: number
  highlighted?: boolean
  size?: number
  category?: string
  isNew?: boolean
}

export function Marker({
  id,
  position,
  icon,
  title,
  visible = true,
  zIndex,
  onClick,
  animation = google.maps.Animation.DROP,
  label,
  opacity = 1,
  highlighted = false,
  size = 32,
  category,
  isNew = false,
}: MarkerProps) {
  const [hover, setHover] = useState(false)
  const [hasAnimation, setHasAnimation] = useState(true)

  // Remove animation after it completes to prevent it repeating on re-renders
  useEffect(() => {
    if (animation) {
      const timer = setTimeout(() => {
        setHasAnimation(false)
      }, 750)
      return () => clearTimeout(timer)
    }
  }, [animation])

  // Handle highlighted status change - add BOUNCE animation when highlighted
  useEffect(() => {
    if (highlighted) {
      setHasAnimation(true)
      const timer = setTimeout(() => {
        setHasAnimation(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [highlighted])

  // Calculate the size based on hover state - scale up more for a dramatic effect
  const effectiveSize = hover ? Math.floor(size * 1.3) : size

  // Adjust the z-index for hover effect
  const effectiveZIndex = hover
    ? (zIndex || 1) + 20
    : highlighted
    ? (zIndex || 1) + 10
    : zIndex

  // Determine the animation to use
  const currentAnimation = hasAnimation
    ? highlighted
      ? google.maps.Animation.BOUNCE
      : animation
    : undefined

  // If it's a new marker, add a label to indicate it
  const markerLabel = isNew
    ? {
        text: "NEW",
        color: "#FFFFFF",
        fontSize: "10px",
        fontWeight: "bold",
        className: "bg-emerald-600 px-1 rounded",
      }
    : undefined

  return (
    <>
      <GoogleMapMarker
        position={position}
        onClick={() => onClick && onClick(id)}
        title={title}
        visible={visible}
        zIndex={effectiveZIndex}
        animation={currentAnimation}
        label={markerLabel}
        opacity={opacity}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        icon={
          icon
            ? {
                url: icon,
                scaledSize: new google.maps.Size(effectiveSize, effectiveSize),
                // Center the marker on its position
                anchor: new google.maps.Point(
                  effectiveSize / 2,
                  effectiveSize / 2
                ),
                // Adjust for hover effect - add a slight "lift" for 3D effect
                origin: hover
                  ? new google.maps.Point(0, -2)
                  : new google.maps.Point(0, 0),
                // Add a drop shadow if hovering
                labelOrigin: new google.maps.Point(
                  effectiveSize / 2,
                  effectiveSize + 10
                ),
              }
            : undefined
        }
      />

      {/* Pulse effect for new markers */}
      {isNew && (
        <GoogleMapMarker
          position={position}
          clickable={false}
          zIndex={(zIndex || 1) - 1}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: effectiveSize * 0.6,
            fillColor: "#047857",
            fillOpacity: 0.3,
            strokeWeight: 0,
          }}
        />
      )}
    </>
  )
}
