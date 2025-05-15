
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProblemProvider } from "./contexts/ProblemContext";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemDetails from "./pages/ProblemDetails";
import SubmitProblem from "./pages/SubmitProblem";
import MapView from "./pages/MapView";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProblemProvider>
        <ChatbotProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/problems" element={<ProblemsPage />} />
                    <Route path="/problems/:id" element={<ProblemDetails />} />
                    <Route path="/submit-problem" element={<SubmitProblem />} />
                    <Route path="/map" element={<MapView />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ChatbotProvider>
      </ProblemProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
