"use client";

import { Hero } from "@/components/landingPage/Hero";
import { NavBar } from "@/components/landingPage/NavBar";
import {
  Video,
  Camera,
  Play,
  Star,
  Wand2,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  CheckCircle2,
  Users,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030014] text-white overflow-hidden">
      <NavBar />

      <Hero />

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-6 backdrop-blur-sm border border-purple-900/20 hover:border-purple-500/50 transition-colors">
            <Star className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Instant Avatar Creation
            </h3>
            <p className="text-gray-400">
              Generate your video avatar in minutes with just a few photos
            </p>
          </div>
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-6 backdrop-blur-sm border border-purple-900/20 hover:border-purple-500/50 transition-colors">
            <Camera className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">High-Quality Video</h3>
            <p className="text-gray-400">
              Crystal clear 4K video output with smooth animations
            </p>
          </div>
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-6 backdrop-blur-sm border border-purple-900/20 hover:border-purple-500/50 transition-colors">
            <Wand2 className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Voice Synchronization
            </h3>
            <p className="text-gray-400">
              Perfect lip-sync with natural voice modulation
            </p>
          </div>
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-6 backdrop-blur-sm border border-purple-900/20 hover:border-purple-500/50 transition-colors">
            <Star className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Custom Animations</h3>
            <p className="text-gray-400">
              Add expressions and gestures to your avatar
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                50K+
              </div>
              <div className="text-gray-400">Avatars Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                100+
              </div>
              <div className="text-gray-400">Animation Styles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">98%</div>
              <div className="text-gray-400">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">4K</div>
              <div className="text-gray-400">Video Quality</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#030014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Create Your Avatar in 3 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-purple-900/20">
                <Camera className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">1. Upload Photos</h3>
                <p className="text-gray-400">
                  Upload a few photos of yourself from different angles
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-purple-900/20">
                <Sparkles className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">2. Record Voice</h3>
                <p className="text-gray-400">
                  Record a short voice sample for perfect synchronization
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-purple-900/20">
                <Video className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">
                  3. Generate Avatar
                </h3>
                <p className="text-gray-400">
                  Get your personalized video avatar in minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <Video className="h-8 w-8 text-purple-400" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  AvatarAI
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Create stunning AI-powered video avatars with perfect voice
                synchronization
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest AI avatar features.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[#1a1a1a] text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1"
                />
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-lg transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-900/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 AvatarAI. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
