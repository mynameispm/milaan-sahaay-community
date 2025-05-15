
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useProblems } from "@/contexts/ProblemContext";
import { formatDistanceToNow } from "date-fns";
import { User, LogOut, MapPin } from "lucide-react";
import ProblemCard from "@/components/ProblemCard";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { problems, userProblems, upvoteProblem } = useProblems();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Get problems that the user is helping with (for helpers only)
  const helpingProblems = user?.role === "helper" 
    ? problems.filter(problem => problem.helperId === user?.id)
    : [];

  if (!user) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">You need to log in first</h1>
        <p className="text-muted-foreground mb-6">
          Please log in or sign up to view your profile.
        </p>
        <Button onClick={() => navigate("/login")}>Log in</Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              {user.role === "seeker" && (
                <TabsTrigger value="my-problems">
                  My Problems
                </TabsTrigger>
              )}
              {user.role === "helper" && (
                <TabsTrigger value="helping">
                  Helping
                </TabsTrigger>
              )}
            </TabsList>
            <Button variant="outline" onClick={signOut} className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </Button>
          </div>
          
          <TabsContent value="profile" className="space-y-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col-reverse sm:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                      <Label>Name</Label>
                      <Input value={user.name} readOnly />
                    </div>
                    <div className="space-y-1">
                      <Label>Email</Label>
                      <Input value={user.email} readOnly />
                    </div>
                    <div className="space-y-1">
                      <Label>Account Type</Label>
                      <div>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                          {user.role === "helper" ? "NGO Helper" : "Problem Seeker"}
                        </Badge>
                      </div>
                    </div>
                    {user.location && (
                      <div className="space-y-1">
                        <Label className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Location
                        </Label>
                        <div className="text-muted-foreground text-sm">
                          {user.location.address || `${user.location.lat.toFixed(6)}, ${user.location.lng.toFixed(6)}`}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center sm:items-start">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="w-full">
                      Change Avatar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="password">Change Password</Label>
                  <div className="flex gap-2">
                    <Input id="password" type="password" placeholder="New password" />
                    <Button variant="outline">Update</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Account created on {new Date().toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="my-problems">
            {userProblems.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">No problems submitted yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't submitted any problems yet. Share your community challenges to get help.
                  </p>
                  <Button onClick={() => navigate("/submit-problem")}>
                    Submit a Problem
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    My Problems ({userProblems.length})
                  </h2>
                  <Button onClick={() => navigate("/submit-problem")}>
                    Submit New Problem
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {userProblems.map((problem, index) => (
                    <ProblemCard 
                      key={problem.id} 
                      problem={problem} 
                      onUpvote={upvoteProblem}
                      index={index} 
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="helping">
            {helpingProblems.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Not helping with any problems yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You are not currently helping with any problems. Browse open problems to find ways to help.
                  </p>
                  <Button onClick={() => navigate("/problems")}>
                    Browse Problems
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Problems I'm Helping With ({helpingProblems.length})
                  </h2>
                  <Button onClick={() => navigate("/problems")}>
                    Find More to Help
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {helpingProblems.map((problem, index) => (
                    <ProblemCard 
                      key={problem.id} 
                      problem={problem} 
                      onUpvote={upvoteProblem}
                      index={index} 
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
