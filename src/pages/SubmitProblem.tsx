
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useProblems } from "@/contexts/ProblemContext";
import { useAuth } from "@/contexts/AuthContext";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "Water & Sanitation",
  "Education",
  "Healthcare",
  "Environment",
  "Infrastructure",
  "Food Security",
  "Women Empowerment",
  "Child Welfare",
  "Elderly Care",
  "Disability Support",
  "Other",
];

const SubmitProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(
    null
  );

  const { addProblem } = useProblems();
  const { user, updateUserLocation } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
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
          setAddress(formattedAddress);
          setLocation({ lat: latitude, lng: longitude, address: formattedAddress });
          
          // Also update user's location
          if (user) {
            updateUserLocation({ lat: latitude, lng: longitude, address: formattedAddress });
          }
        } catch (error) {
          // If geocoding fails, just use coordinates
          setLocation({ lat: latitude, lng: longitude });
          toast({
            title: "Location Found",
            description: "Address could not be determined, but coordinates were captured",
          });
        }

        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        toast({
          title: "Error",
          description: "Unable to retrieve your location",
          variant: "destructive",
        });
        console.error("Geolocation error:", error);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a problem",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!title || !description || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addProblem({
        title,
        description,
        category,
        authorId: user.id,
        authorName: user.name,
        authorAvatar: user.avatar,
        location: location || undefined,
      });

      toast({
        title: "Success",
        description: "Your problem has been submitted",
      });

      navigate("/problems");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit problem",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">You need to log in first</h1>
        <p className="text-muted-foreground mb-6">
          Please log in or sign up to submit a problem.
        </p>
        <Button onClick={() => navigate("/login")}>Log in</Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Submit a Problem</CardTitle>
              <CardDescription>
                Share details about the community problem you need help with
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Problem Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a clear title for your problem"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Problem Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the problem in detail. What help do you need?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> Location
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Enter an address or use current location"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getCurrentLocation}
                      disabled={isLocating}
                    >
                      {isLocating ? "Locating..." : "Use Current"}
                    </Button>
                  </div>
                  {location && (
                    <p className="text-sm text-muted-foreground">
                      Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Problem"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitProblem;
