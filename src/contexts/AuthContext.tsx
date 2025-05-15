
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "helper" | "seeker";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string, role: UserRole) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => void;
  updateUserLocation: (location: { lat: number; lng: number; address?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    name: "Demo Helper",
    email: "helper@milaan.org",
    role: "helper",
    avatar: "https://i.pravatar.cc/150?u=helper",
    location: { lat: 20.5937, lng: 78.9629 },
  },
  {
    id: "2",
    name: "Demo Seeker",
    email: "seeker@milaan.org",
    role: "seeker",
    avatar: "https://i.pravatar.cc/150?u=seeker",
    location: { lat: 28.6139, lng: 77.2090 },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("milaanUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("milaanUser", JSON.stringify(user));
    }
  }, [user]);

  // Mock sign in
  const signIn = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email && u.role === role);
      
      if (foundUser) {
        setUser(foundUser);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign up
  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        role,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
      };
      
      setUser(newUser);
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = () => {
    localStorage.removeItem("milaanUser");
    setUser(null);
  };

  // Update user location
  const updateUserLocation = (location: { lat: number; lng: number; address?: string }) => {
    if (user) {
      const updatedUser = { ...user, location };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateUserLocation }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
