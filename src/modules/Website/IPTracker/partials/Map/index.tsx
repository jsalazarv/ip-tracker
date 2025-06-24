import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useGeolocation } from '@common/hooks/features/useGeolocation';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapProps {
  coordinates?: Coordinates;
  ip?: string;
}

function MapUpdater({ coordinates }: { coordinates?: Coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.latitude, coordinates.longitude], 13);
    }
  }, [coordinates, map]);

  return null;
}

export default function Map({ coordinates, ip }: MapProps) {
  const { coordinates: userLocation, error } = useGeolocation();

  if (!coordinates && !userLocation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">{error || 'Obteniendo ubicación...'}</p>
      </div>
    );
  }

  const mapCoordinates = coordinates || userLocation;

  if (!mapCoordinates) return null;

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[mapCoordinates.latitude, mapCoordinates.longitude]}
        zoom={coordinates ? 13 : 3}
        scrollWheelZoom={true}
        className="h-full w-full">
        <MapUpdater coordinates={coordinates} />
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup closeButton={false} autoPan={false}>
              Tu estás aquí
            </Popup>
          </Marker>
        )}
        {coordinates && (
          <Marker position={[coordinates.latitude, coordinates.longitude]}>
            <Popup closeButton={false} autoPan={false}>
              IP: {ip}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
