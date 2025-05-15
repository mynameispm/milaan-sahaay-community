
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Languages for welcome animation with more space between rotations
const welcomeTexts = [
  { lang: "Hindi", text: "मिलान में आपका स्वागत है" },
  { lang: "Telugu", text: "మిలాన్‌కి స్వాగతం" },
  { lang: "Bengali", text: "মিলানে স্বাগতম" },
  { lang: "Sanskrit", text: "मिलानम् स्वागतम्" },
  { lang: "Tamil", text: "மிலானுக்கு வரவேற்கிறோம்" },
  { lang: "Marathi", text: "मिलानमध्ये आपले स्वागत आहे" },
  { lang: "Kannada", text: "ಮಿಲಾನ್‌ಗೆ ಸುಸ್ವಾಗತ" },
  { lang: "Malayalam", text: "മിലാനിലേക്ക് സ്വാഗതം" },
  { lang: "Gujarati", text: "મિલાનમાં આપનું સ્વાગત છે" },
];

export default function Welcome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Effect for cycling through languages with longer display times
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % welcomeTexts.length);
        setIsVisible(true);
      }, 800); // Wait for fade out animation before changing text
    }, 4000); // Display each language for 4 seconds (increased from 3)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-16 px-6 sm:px-8 lg:px-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-milaan-100/40 via-background to-teal-100/30" />
      </div>

      {/* Enhanced floating circles decoration */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 blur-3xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-orange-300/20 to-yellow-200/20 blur-2xl"
        animate={{
          x: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="relative z-10 max-w-4xl text-center">
        {/* Language indicator with improved visibility */}
        <motion.div
          className="text-base font-medium text-milaan-500 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {welcomeTexts[currentIndex].lang}
        </motion.div>

        {/* Welcome text with larger size */}
        <motion.h1
          className="text-5xl sm:text-7xl font-bold mb-8 shimmer-text tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7 }}
        >
          {welcomeTexts[currentIndex].text}
        </motion.h1>

        <h2 className="text-2xl sm:text-4xl font-semibold mb-8 text-foreground/80">
          Connect with NGO helpers to solve community problems
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Milaan is a community platform that brings together people facing challenges and NGO
          helpers who can provide solutions. Join us to make a difference in your community.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/problems">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 shadow-md hover:shadow-lg transition-all">
              Browse Problems
            </Button>
          </Link>
          <Link to="/map">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-teal-400 text-teal-600 hover:bg-teal-50 hover:text-teal-700 shadow-md hover:shadow-lg transition-all">
              Open Map View
            </Button>
          </Link>
          <Link to="/submit-problem">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-milaan-300 to-milaan-200 hover:from-milaan-400 hover:to-milaan-300 shadow-md hover:shadow-lg transition-all">
              Submit a Problem
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
