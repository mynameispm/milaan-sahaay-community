
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Languages for welcome animation
const welcomeTexts = [
  { lang: "Hindi", text: "मिलान में आपका स्वागत है" },
  { lang: "English", text: "Welcome to Milaan" },
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

  // Effect for cycling through languages
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % welcomeTexts.length);
        setIsVisible(true);
      }, 500); // Wait for fade out animation before changing text
    }, 3000); // Change language every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-milaan-100/40 via-background to-teal-100/30" />
      </div>

      {/* Floating circles decoration */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-36 h-36 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-2xl"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 blur-2xl"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="relative z-10 max-w-3xl text-center">
        {/* Language indicator */}
        <motion.div
          className="text-sm font-medium text-muted-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {welcomeTexts[currentIndex].lang}
        </motion.div>

        {/* Welcome text */}
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-6 shimmer-text tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          {welcomeTexts[currentIndex].text}
        </motion.h1>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground/80">
          Connect with NGO helpers to solve community problems
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Milaan is a community platform that brings together people facing challenges and NGO
          helpers who can provide solutions. Join us to make a difference.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/problems">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Problems
            </Button>
          </Link>
          <Link to="/submit-problem">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Submit a Problem
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
