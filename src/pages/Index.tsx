
import Welcome from "@/components/Welcome";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useProblems } from "@/contexts/ProblemContext";
import ProblemCard from "@/components/ProblemCard";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Users, MapPin, MessageCircle } from "lucide-react";

const Index = () => {
  const { problems, upvoteProblem } = useProblems();

  // Get recent problems
  const recentProblems = [...problems]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Get top problems by upvotes
  const topProblems = [...problems]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3);

  const features = [
    {
      icon: <HelpCircle className="h-10 w-10 mb-4 text-primary" />,
      title: "Submit Problems",
      description:
        "Share your community challenges and get connected with NGOs who can help solve them.",
    },
    {
      icon: <Users className="h-10 w-10 mb-4 text-primary" />,
      title: "Connect with Helpers",
      description:
        "NGOs and volunteers can find problems to solve and make a real difference in communities.",
    },
    {
      icon: <MapPin className="h-10 w-10 mb-4 text-primary" />,
      title: "Location Tracking",
      description:
        "Track problems by location and find issues near you that need assistance.",
    },
    {
      icon: <MessageCircle className="h-10 w-10 mb-4 text-primary" />,
      title: "AI Assistant",
      description:
        "Get guidance and support from our AI assistant to help navigate resources.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Welcome />

      {/* Featured Problems */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Problems</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through problems submitted by community members and find opportunities to help
          </p>
        </div>

        <Tabs defaultValue="recent" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="recent">Recent Problems</TabsTrigger>
              <TabsTrigger value="top">Top Problems</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recent">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProblems.map((problem, index) => (
                <ProblemCard 
                  key={problem.id} 
                  problem={problem} 
                  onUpvote={upvoteProblem}
                  index={index} 
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link to="/problems">
                <Button variant="outline">View All Problems</Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="top">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topProblems.map((problem, index) => (
                <ProblemCard 
                  key={problem.id} 
                  problem={problem} 
                  onUpvote={upvoteProblem} 
                  index={index}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link to="/problems">
                <Button variant="outline">View All Problems</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">How Milaan Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milaan connects people with problems to NGO helpers who can provide solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="flex justify-center">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="gradient-border">
            <div className="bg-background rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to make a difference?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join Milaan today to either submit problems that need solutions or become a helper to solve community issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/problems">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Problems
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Milaan
              </div>
              <p className="mt-2 text-muted-foreground max-w-xs">
                Connecting community problems with NGO solutions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-3">Platform</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/" className="hover:text-primary">Home</Link></li>
                  <li><Link to="/problems" className="hover:text-primary">Problems</Link></li>
                  <li><Link to="/map" className="hover:text-primary">Map</Link></li>
                  <li><Link to="/chat" className="hover:text-primary">Chat</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Account</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/login" className="hover:text-primary">Login</Link></li>
                  <li><Link to="/signup" className="hover:text-primary">Sign Up</Link></li>
                  <li><Link to="/profile" className="hover:text-primary">Profile</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Legal</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="#" className="hover:text-primary">Privacy Policy</Link></li>
                  <li><Link to="#" className="hover:text-primary">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Milaan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
