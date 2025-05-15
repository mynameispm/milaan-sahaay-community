
import { useEffect, useRef } from "react";
import { useProblems } from "@/contexts/ProblemContext";

interface MapProps {
  height?: string;
  width?: string;
}

export default function GoogleMap({ height = "600px", width = "100%" }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { problems } = useProblems();

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current) return;

    // Center on India
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 5,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }, { lightness: 17 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#6b3fd6" }, { lightness: 60 }, { visibility: "on" }, { weight: 1.5 }],
        },
      ],
    };

    googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

    return () => {
      // Clear markers when component unmounts
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  // Add markers for problems
  useEffect(() => {
    if (!googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add a marker for each problem with location
    problems.forEach((problem) => {
      if (problem.location) {
        const markerColor = problem.status === "open" ? "#6b3fd6" : 
                          problem.status === "in-progress" ? "#3b82f6" : "#6b7280";

        // Create custom marker
        const marker = new google.maps.Marker({
          position: { lat: problem.location.lat, lng: problem.location.lng },
          map: googleMapRef.current,
          title: problem.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: markerColor,
            fillOpacity: 0.7,
            strokeColor: "white",
            strokeWeight: 2,
          },
          animation: google.maps.Animation.DROP,
        });

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="max-width:250px;padding:5px;">
              <h3 style="font-weight:bold;margin-bottom:5px;">${problem.title}</h3>
              <p style="font-size:12px;margin-bottom:5px;">${problem.category}</p>
              <p style="font-size:12px;color:#666;margin-bottom:5px;">${
                problem.location?.address || ""
              }</p>
              <span style="display:inline-block;padding:2px 5px;background-color:${
                problem.status === "open" ? "#dcfce7" : 
                problem.status === "in-progress" ? "#dbeafe" : "#f3f4f6"
              };border-radius:4px;color:${
                problem.status === "open" ? "#166534" : 
                problem.status === "in-progress" ? "#1e40af" : "#4b5563"
              };font-size:12px;">${problem.status}</span>
            </div>
          `,
        });

        // Add click event listener to marker
        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map: googleMapRef.current,
            shouldFocus: false,
          });

          // Navigate to problem details when clicked
          setTimeout(() => {
            window.location.href = `/problems/${problem.id}`;
          }, 1500);
        });

        // Save marker reference
        markersRef.current.push(marker);
      }
    });
  }, [problems]);

  return <div ref={mapRef} style={{ height, width }} className="rounded-lg shadow-lg" />;
}
