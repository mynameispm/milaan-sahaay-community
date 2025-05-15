
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useProblems } from "@/contexts/ProblemContext";
import { useAuth } from "@/contexts/AuthContext";
import AIChat from "@/components/AIChat";
import GoogleMap from "@/components/GoogleMap";
import { ArrowLeft, MessageSquare, MapPin, Calendar, ArrowUp, User } from "lucide-react";

const ProblemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProblemById, updateProblemStatus, addComment, upvoteProblem } = useProblems();
  const { user } = useAuth();
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [problem, setProblem] = useState(id ? getProblemById(id) : undefined);
  const [isUpvoted, setIsUpvoted] = useState(false);

  useEffect(() => {
    if (id) {
      const problemData = getProblemById(id);
      setProblem(problemData);
    }
  }, [id, getProblemById]);

  if (!problem) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Problem Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The problem you're looking for does not exist or has been removed.
        </p>
        <Link to="/problems">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Problems
          </Button>
        </Link>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to comment",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    addComment(problem.id, comment);
    setComment("");
    
    toast({
      title: "Success",
      description: "Your comment has been added",
    });
  };

  const handleStatusChange = (status: "open" | "in-progress" | "resolved") => {
    if (!user) return;
    
    updateProblemStatus(problem.id, status, user.id, user.name);
    
    toast({
      title: "Status Updated",
      description: `Problem status changed to ${status}`,
    });
  };

  const handleUpvote = () => {
    if (isUpvoted) return;
    
    upvoteProblem(problem.id);
    setIsUpvoted(true);
    
    toast({
      title: "Upvoted",
      description: "You have upvoted this problem",
    });
  };

  const statusColor = {
    open: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    resolved: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link to="/problems" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all problems
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{problem.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
                  </CardDescription>
                </div>
                <Badge className={statusColor[problem.status]}>
                  {problem.status === "in-progress" ? "In Progress" : problem.status}
                </Badge>
              </div>

              <div className="flex items-center mt-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={problem.authorAvatar} alt={problem.authorName} />
                  <AvatarFallback>{problem.authorName[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="text-sm font-medium">{problem.authorName}</div>
                  <div className="text-xs text-muted-foreground">Problem Seeker</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Badge variant="outline" className="mb-2">
                {problem.category}
              </Badge>
              
              <div className="prose max-w-none text-foreground">
                <p className="whitespace-pre-wrap">{problem.description}</p>
              </div>
              
              {problem.location && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> Location
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {problem.location.address || "Location data available"}
                  </p>
                  <div className="mt-2 h-[200px] rounded-md overflow-hidden">
                    <GoogleMap height="200px" />
                  </div>
                </div>
              )}
              
              {problem.status === "in-progress" && problem.helperName && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium flex items-center">
                    <User className="h-4 w-4 mr-1" /> Currently being helped by
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {problem.helperName}
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUpvote}
                className={isUpvoted ? "text-primary" : ""}
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                Upvote ({problem.upvotes + (isUpvoted ? 1 : 0)})
              </Button>
              
              {user && user.role === "helper" && problem.status !== "resolved" && (
                <div className="flex space-x-2">
                  {problem.status === "open" && (
                    <Button size="sm" onClick={() => handleStatusChange("in-progress")}>
                      Help with this problem
                    </Button>
                  )}
                  {problem.status === "in-progress" && problem.helperId === user.id && (
                    <Button size="sm" onClick={() => handleStatusChange("resolved")}>
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              )}
            </CardFooter>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" /> 
              Comments ({problem.comments.length})
            </h2>
            
            {user ? (
              <form onSubmit={handleSubmitComment} className="mb-6">
                <Textarea
                  placeholder="Add your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-2"
                />
                <Button type="submit" disabled={!comment.trim()}>
                  Post Comment
                </Button>
              </form>
            ) : (
              <Card className="mb-6 bg-muted/50">
                <CardContent className="py-4 text-center">
                  <p>
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>{" "}
                    to join the conversation
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {problem.comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                problem.comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardHeader className="py-3">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                          <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <div className="text-sm font-medium">{comment.userName}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="whitespace-pre-wrap">{comment.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="ai">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai">
              <Card>
                <CardContent className="p-0 h-[500px]">
                  <AIChat problemId={problem.id} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Problem Location</CardTitle>
                  <CardDescription>
                    View this problem on the map
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 h-[400px]">
                  <GoogleMap />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Similar Problems</CardTitle>
              <CardDescription>
                Other problems in the same category
              </CardDescription>
            </CardHeader>
            <CardContent className="py-0">
              <div className="space-y-4">
                {/* We would typically fetch related problems here */}
                <p className="text-center text-muted-foreground py-4">
                  No similar problems found
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
