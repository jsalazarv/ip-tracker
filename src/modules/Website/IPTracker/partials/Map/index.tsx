import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useGeolocation } from '@common/hooks/features/useGeolocation';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapProps {
  coordinates?: Coordinates;
  ip?: string;
}

export default function Map({ coordinates, ip }: MapProps) {
  const { coordinates: userLocation, error } = useGeolocation();

  if (!coordinates) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">
          {error || 'No hay coordenadas disponibles'}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[coordinates.latitude, coordinates.longitude]}
        zoom={3}
        scrollWheelZoom={false}
        className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>Tu estás aquí</Popup>
          </Marker>
        )}
        <Marker position={[coordinates.latitude, coordinates.longitude]}>
          <Popup>IP: {ip}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
