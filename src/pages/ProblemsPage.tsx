
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useProblems } from "@/contexts/ProblemContext";
import ProblemCard from "@/components/ProblemCard";
import { Link } from "react-router-dom";
import { Search, Plus, Filter } from "lucide-react";

const categories = [
  "All",
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

const ProblemsPage = () => {
  const { problems, upvoteProblem } = useProblems();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  const filteredProblems = problems.filter((problem) => {
    // Apply text search
    const matchesSearch =
      searchQuery === "" ||
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply category filter
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory;

    // Apply status filter
    const matchesStatus = statusFilter === "All" || problem.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort problems
  const sortedProblems = [...filteredProblems].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "votes") {
      return b.upvotes - a.upvotes;
    } else if (sortBy === "activity") {
      return b.comments.length - a.comments.length;
    }
    return 0;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Community Problems</h1>
          <p className="text-muted-foreground">
            Browse and find problems that need solutions
          </p>
        </div>
        <Link to="/submit-problem" className="mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Submit Problem
          </Button>
        </Link>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="votes">Most Upvoted</SelectItem>
                <SelectItem value="activity">Most Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {sortedProblems.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No problems found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All");
            setStatusFilter("All");
          }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProblems.map((problem, index) => (
            <ProblemCard 
              key={problem.id} 
              problem={problem} 
              onUpvote={upvoteProblem}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemsPage;
