import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useGeolocation } from '@common/hooks/features/useGeolocation';
import { toast } from 'react-toastify';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapProps {
  coordinates?: Coordinates;
  ip?: string;
  error?: string;
}

function MapUpdater({
  coordinates,
  userLocation,
  hasError,
}: {
  coordinates?: Coordinates;
  userLocation?: Coordinates;
  hasError?: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (hasError && userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], 13);
    } else if (coordinates) {
      map.setView([coordinates.latitude, coordinates.longitude], 13);
    }
  }, [coordinates, userLocation, hasError, map]);

  return null;
}

export default function Map({ coordinates, ip, error: apiError }: MapProps) {
  const { coordinates: userLocation, error: geoError } = useGeolocation();

  useEffect(() => {
    if (apiError && userLocation) {
      toast.error(apiError);
    }
  }, [apiError, userLocation]);

  if (!coordinates && !userLocation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">{geoError || 'Obteniendo ubicación...'}</p>
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
        <MapUpdater
          coordinates={coordinates}
          userLocation={userLocation}
          hasError={!!apiError}
        />
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
