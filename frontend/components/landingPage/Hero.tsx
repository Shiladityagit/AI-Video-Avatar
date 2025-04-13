"use client";

import { motion } from "framer-motion";
import { Camera, Loader, Play, BookOpen } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export const Hero = () => {
  useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleAITutor = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      await signIn("google", {
        callbackUrl: "/ai-tutor",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAvatar = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#7c4a2a1a_1px,transparent_1px),linear-gradient(to_bottom,#7c4a2a1a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-900/40 via-amber-800/30 to-transparent rounded-full blur-3xl -z-10"
        ></motion.div>

        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent"
            variants={fadeUpVariant}
          >
            Create Stunning AI Video Avatars in Minutes
          </motion.h1>

          <motion.p
            className="text-xl text-orange-200/70 mb-12"
            variants={fadeUpVariant}
          >
            Transform your photos and voice into lifelike video avatars using
            cutting-edge AI technology
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={handleCreateAvatar}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              variants={fadeUpVariant}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              <Camera className="w-5 h-5" />
              CREATE YOUR AVATAR
              {loading && <Loader className="animate-spin w-5 h-5" />}
            </motion.button>

            <motion.button
              onClick={handleAITutor}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              variants={fadeUpVariant}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              <BookOpen className="w-5 h-5" />
              {loading ? "Logging In..." : "AI TUTOR"}
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-[#3b1d06] rounded-full text-white font-medium hover:bg-[#4b2507] transition-colors flex items-center gap-2"
              variants={fadeUpVariant}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              VIEW EXAMPLES
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
