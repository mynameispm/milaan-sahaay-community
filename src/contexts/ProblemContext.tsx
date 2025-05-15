
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth, User } from "./AuthContext";

export interface Comment {
  id: string;
  problemId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  status: "open" | "in-progress" | "resolved";
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  helperId?: string;
  helperName?: string;
  comments: Comment[];
  upvotes: number;
}

interface ProblemContextType {
  problems: Problem[];
  userProblems: Problem[];
  addProblem: (problem: Omit<Problem, "id" | "createdAt" | "comments" | "upvotes" | "status">) => void;
  getProblemById: (id: string) => Problem | undefined;
  updateProblemStatus: (id: string, status: "open" | "in-progress" | "resolved", helperId?: string, helperName?: string) => void;
  addComment: (problemId: string, content: string) => void;
  upvoteProblem: (id: string) => void;
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

// Mock data
const mockProblems: Problem[] = [
  {
    id: "1",
    title: "Need clean water access in rural village",
    description: "Our village has been suffering from water scarcity for the past month. We need help with digging a new well or providing water purification systems.",
    category: "Water & Sanitation",
    createdAt: new Date(2023, 5, 15),
    authorId: "2",
    authorName: "Raj Kumar",
    authorAvatar: "https://i.pravatar.cc/150?u=raj",
    status: "open",
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: "Delhi, India",
    },
    comments: [],
    upvotes: 15,
  },
  {
    id: "2",
    title: "Education materials needed for children",
    description: "We're looking for books, stationery, and learning materials for underprivileged children in our community school.",
    category: "Education",
    createdAt: new Date(2023, 4, 28),
    authorId: "3",
    authorName: "Priya Singh",
    authorAvatar: "https://i.pravatar.cc/150?u=priya",
    status: "in-progress",
    helperId: "1",
    helperName: "NGO Education First",
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: "Bangalore, India",
    },
    comments: [
      {
        id: "c1",
        problemId: "2",
        userId: "1",
        userName: "NGO Education First",
        userAvatar: "https://i.pravatar.cc/150?u=ngo1",
        content: "We're collecting the materials and will deliver them next week.",
        createdAt: new Date(2023, 5, 2),
      },
    ],
    upvotes: 23,
  },
  {
    id: "3",
    title: "Medical camp needed in slum area",
    description: "There's an outbreak of seasonal flu in our slum area. We need medical volunteers and medicines.",
    category: "Healthcare",
    createdAt: new Date(2023, 5, 20),
    authorId: "4",
    authorName: "Amit Verma",
    authorAvatar: "https://i.pravatar.cc/150?u=amit",
    status: "open",
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: "Mumbai, India",
    },
    comments: [],
    upvotes: 8,
  },
  {
    id: "4",
    title: "Need volunteers for tree plantation drive",
    description: "We're organizing a tree plantation drive in our community and need volunteers and saplings.",
    category: "Environment",
    createdAt: new Date(2023, 6, 5),
    authorId: "5",
    authorName: "Green Earth Initiative",
    authorAvatar: "https://i.pravatar.cc/150?u=greenearth",
    status: "open",
    location: {
      lat: 26.8467,
      lng: 80.9462,
      address: "Lucknow, India",
    },
    comments: [],
    upvotes: 12,
  },
];

export function ProblemProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load mock problems
    setProblems(mockProblems);
  }, []);

  // Get problems created by the current user
  const userProblems = user
    ? problems.filter((problem) => problem.authorId === user.id)
    : [];

  // Add a new problem
  const addProblem = (
    problem: Omit<Problem, "id" | "createdAt" | "comments" | "upvotes" | "status">
  ) => {
    const newProblem: Problem = {
      ...problem,
      id: `problem_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      status: "open",
      comments: [],
      upvotes: 0,
    };
    setProblems((prev) => [...prev, newProblem]);
  };

  // Get problem by ID
  const getProblemById = (id: string) => {
    return problems.find((problem) => problem.id === id);
  };

  // Update problem status
  const updateProblemStatus = (
    id: string,
    status: "open" | "in-progress" | "resolved",
    helperId?: string,
    helperName?: string
  ) => {
    setProblems((prev) =>
      prev.map((problem) =>
        problem.id === id
          ? {
              ...problem,
              status,
              helperId: helperId || problem.helperId,
              helperName: helperName || problem.helperName,
            }
          : problem
      )
    );
  };

  // Add a comment to a problem
  const addComment = (problemId: string, content: string) => {
    if (!user) return;

    const comment: Comment = {
      id: `comment_${Math.random().toString(36).substr(2, 9)}`,
      problemId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content,
      createdAt: new Date(),
    };

    setProblems((prev) =>
      prev.map((problem) =>
        problem.id === problemId
          ? { ...problem, comments: [...problem.comments, comment] }
          : problem
      )
    );
  };

  // Upvote a problem
  const upvoteProblem = (id: string) => {
    setProblems((prev) =>
      prev.map((problem) =>
        problem.id === id
          ? { ...problem, upvotes: problem.upvotes + 1 }
          : problem
      )
    );
  };

  return (
    <ProblemContext.Provider
      value={{
        problems,
        userProblems,
        addProblem,
        getProblemById,
        updateProblemStatus,
        addComment,
        upvoteProblem,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
}

export const useProblems = () => {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error("useProblems must be used within a ProblemProvider");
  }
  return context;
};
