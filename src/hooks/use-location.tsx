
import { useState } from "react";
import { useToast } from "./use-toast";

interface LocationData {
  lat: number;
  lng: number;
  address?: string;
}

export function useLocation() {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const { toast } = useToast();
  
  const getCurrentLocation = async (): Promise<LocationData | null> => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return null;
    }

    setIsLocating(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const { latitude, lng } = position.coords;
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      // Attempt to get address from coordinates using Google Maps Geocoding API
      try {
        const geocoder = new google.maps.Geocoder();
        const result = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              if (status === "OK" && results?.[0]) {
                resolve(results[0]);
              } else {
                reject(new Error("Geocoding failed"));
              }
            }
          );
        });

        const formattedAddress = result.formatted_address;
        const locationData = { 
          lat: latitude, 
          lng: longitude, 
          address: formattedAddress 
        };
        
        setLocation(locationData);
        return locationData;
      } catch (error) {
        // If geocoding fails, just use coordinates
        const locationData = { lat: latitude, lng: longitude };
        setLocation(locationData);
        toast({
          title: "Location Found",
          description: "Address could not be determined, but coordinates were captured",
        });
        return locationData;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to retrieve your location",
        variant: "destructive",
      });
      console.error("Geolocation error:", error);
      return null;
    } finally {
      setIsLocating(false);
    }
  };

  return { location, isLocating, getCurrentLocation };
}
