
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Plus, Map, MessageCircle, Home, User, LogOut, HelpCircle } from "lucide-react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMobileMenu}>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Milaan
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={closeMobileMenu}
            >
              <Home className="inline-block w-4 h-4 mr-2" />
              Home
            </Link>
            <Link
              to="/problems"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/problems")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={closeMobileMenu}
            >
              <HelpCircle className="inline-block w-4 h-4 mr-2" />
              Problems
            </Link>
            <Link
              to="/map"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/map")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={closeMobileMenu}
            >
              <Map className="inline-block w-4 h-4 mr-2" />
              Map
            </Link>
            <Link
              to="/chat"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/chat")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={closeMobileMenu}
            >
              <MessageCircle className="inline-block w-4 h-4 mr-2" />
              Chat
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/submit-problem">
                  <Button variant="outline" size="sm" className="hidden md:flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> Submit Problem
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 mt-1 text-xs font-medium text-primary">
                          {user.role === "helper" ? "Helper" : "Problem Seeker"}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer w-full flex items-center">
                        <User className="mr-2 h-4 w-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={signOut}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/")
                ? "bg-primary text-primary-foreground"
                : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={closeMobileMenu}
          >
            <Home className="inline-block w-4 h-4 mr-2" />
            Home
          </Link>
          <Link
            to="/problems"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/problems")
                ? "bg-primary text-primary-foreground"
                : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={closeMobileMenu}
          >
            <HelpCircle className="inline-block w-4 h-4 mr-2" />
            Problems
          </Link>
          <Link
            to="/map"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/map")
                ? "bg-primary text-primary-foreground"
                : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={closeMobileMenu}
          >
            <Map className="inline-block w-4 h-4 mr-2" />
            Map
          </Link>
          <Link
            to="/chat"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/chat")
                ? "bg-primary text-primary-foreground"
                : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={closeMobileMenu}
          >
            <MessageCircle className="inline-block w-4 h-4 mr-2" />
            Chat
          </Link>
          {user && (
            <Link
              to="/submit-problem"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              onClick={closeMobileMenu}
            >
              <Plus className="inline-block w-4 h-4 mr-2" />
              Submit Problem
            </Link>
          )}
          {!user && (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                onClick={closeMobileMenu}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground"
                onClick={closeMobileMenu}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
