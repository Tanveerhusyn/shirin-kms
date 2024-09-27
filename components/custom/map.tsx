"use client"

import { GoogleMap, Marker } from "@react-google-maps/api"

const defaultMapContainerStyle = {
  width: "100%",
  height: "800px",
  borderRadius: "15px 0px 0px 15px",
}

const defaultMapCenter = {
  lat: 36.3920805,
  lng: 74.853502,
}

const defaultMapZoom = 18

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "satellite",
}

const MapComponent = () => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <Marker position={defaultMapCenter} />
      </GoogleMap>
    </div>
  )
}

export { MapComponent }
