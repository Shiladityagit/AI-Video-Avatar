import { Video } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";

export const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const handleGoogleSignin = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("google", {
        callbackUrl: `/dashboard`,
      });
      //   toast.success("Successfully logged in!");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google");
      //   toast.error("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Video className="h-8 w-8 text-purple-400" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              WiWiAvatar
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Gallery
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                handleGoogleSignin();
              }}
              className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:opacity-90 transition-opacity">
              Create Avatar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
