
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("seeker");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(email, password, role);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password. Try demo@milaan.org with password 'password'",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <div className="max-w-md w-full">
        <Card className="shadow-lg border-muted">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Sign in to your Milaan account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="seeker" className="mb-6" onValueChange={(v) => setRole(v as UserRole)}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="seeker">Problem Seeker</TabsTrigger>
                <TabsTrigger value="helper">NGO Helper</TabsTrigger>
              </TabsList>
              <div className="mt-4 text-sm text-center text-muted-foreground">
                {role === "seeker" ? (
                  "Login as someone seeking help for community problems"
                ) : (
                  "Login as an NGO representative or helper"
                )}
              </div>
            </Tabs>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Demo accounts:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="text-xs text-left">
                  <p><b>Helper:</b> helper@milaan.org</p>
                  <p><b>Password:</b> password</p>
                </div>
                <div className="text-xs text-left">
                  <p><b>Seeker:</b> seeker@milaan.org</p>
                  <p><b>Password:</b> password</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
