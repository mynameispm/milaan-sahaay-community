
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import GoogleMap from "@/components/GoogleMap";
import { useProblems } from "@/contexts/ProblemContext";
import { Link } from "react-router-dom";
import { Filter, MapPin, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const MapView = () => {
  const { problems } = useProblems();
  const { user, updateUserLocation } = useAuth();
  const [isLocating, setIsLocating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Filter problems based on status
  const filteredProblems = problems.filter(problem => {
    if (selectedStatus === "all") return true;
    return problem.status === selectedStatus;
  });
  
  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
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
          
          // Update user's location
          if (user) {
            updateUserLocation({ 
              lat: latitude, 
              lng: longitude, 
              address: formattedAddress 
            });
          }
        } catch (error) {
          // If geocoding fails, just use coordinates
          if (user) {
            updateUserLocation({ lat: latitude, lng: longitude });
          }
        }

        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        console.error("Geolocation error:", error);
      }
    );
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Map View</h1>
          <p className="text-muted-foreground">
            Explore problems by location
          </p>
        </div>
        <Button onClick={getCurrentLocation} disabled={isLocating} className="mt-4 md:mt-0">
          <Target className="mr-2 h-4 w-4" />
          {isLocating ? "Locating..." : "Update My Location"}
        </Button>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle>Interactive Map</CardTitle>
                <Tabs 
                  value={selectedStatus} 
                  onValueChange={setSelectedStatus}
                  className="hidden sm:block"
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <GoogleMap height="600px" />
              </div>
            </CardContent>
          </Card>
          
          {/* Mobile filters */}
          <div className="mt-4 lg:hidden">
            <Tabs 
              value={selectedStatus} 
              onValueChange={setSelectedStatus}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Nearby Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[550px] overflow-y-auto">
                {filteredProblems.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No problems found with the selected status
                  </div>
                ) : (
                  <ul className="divide-y">
                    {filteredProblems.map((problem) => (
                      <li key={problem.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <Link to={`/problems/${problem.id}`}>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-sm hover:text-primary transition-colors line-clamp-2">
                              {problem.title}
                            </h3>
                            <Badge 
                              className={
                                problem.status === "open" ? "bg-green-100 text-green-800" :
                                problem.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                                "bg-gray-100 text-gray-800"
                              }
                              variant="outline"
                            >
                              {problem.status === "in-progress" ? "In Progress" : problem.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                            {problem.description}
                          </p>
                          {problem.location?.address && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{problem.location.address}</span>
                            </div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;
