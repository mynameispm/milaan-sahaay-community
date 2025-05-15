
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, MessageSquare, ArrowUp } from "lucide-react";
import { Problem } from "@/contexts/ProblemContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProblemCardProps {
  problem: Problem;
  onUpvote: (id: string) => void;
  index?: number;
}

export default function ProblemCard({ problem, onUpvote, index = 0 }: ProblemCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = () => {
    if (!isUpvoted) {
      onUpvote(problem.id);
      setIsUpvoted(true);
    }
  };

  const statusColor = {
    open: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    resolved: "bg-gray-100 text-gray-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={problem.authorAvatar} alt={problem.authorName} />
                <AvatarFallback>{problem.authorName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{problem.authorName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            <Badge className={cn(statusColor[problem.status])}>
              {problem.status === "in-progress" ? "In Progress" : problem.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <Link to={`/problems/${problem.id}`}>
            <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
              {problem.title}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-3">{problem.description}</p>
          <div className="flex items-center mt-3 text-xs text-muted-foreground">
            <Badge variant="outline" className="mr-2">
              {problem.category}
            </Badge>
            {problem.location?.address && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{problem.location.address}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUpvote}
              className={cn("gap-1", isUpvoted && "text-primary")}
            >
              <ArrowUp className="h-4 w-4" />
              <span>{problem.upvotes + (isUpvoted ? 1 : 0)}</span>
            </Button>
            <Link to={`/problems/${problem.id}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{problem.comments.length}</span>
              </Button>
            </Link>
          </div>
          <Link to={`/problems/${problem.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
