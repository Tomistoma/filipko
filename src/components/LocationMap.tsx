import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const POSITION: [number, number] = [50.1013815, 14.5205999]

// Custom pin matching the site's dark brand color — avoids Leaflet's
// default marker asset, whose relative image paths break under Vite bundling.
const pinIcon = divIcon({
  className: '',
  html: `
    <svg width="34" height="46" viewBox="0 0 34 46" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 0C7.6 0 0 7.6 0 17c0 12.75 17 29 17 29s17-16.25 17-29C34 7.6 26.4 0 17 0z" fill="#1c1917"/>
      <circle cx="17" cy="17" r="6.5" fill="#fafaf9"/>
    </svg>
  `,
  iconSize: [34, 46],
  iconAnchor: [17, 46],
})

export default function LocationMap() {
  return (
    <div style={{ width: '100%', height: '420px' }}>
      <MapContainer
        center={POSITION}
        zoom={15}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={POSITION} icon={pinIcon} />
      </MapContainer>
    </div>
  )
}
