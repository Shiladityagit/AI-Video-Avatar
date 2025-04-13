"use client";

import { useState } from "react";
import {
  Video,
  Camera,
  Mic,
  Upload,
  Play,
  Check,
  Sparkles,
  Loader2,
  ArrowRight,
  X,
  RefreshCw,
  Download,
  Share2,
} from "lucide-react";
import { useSession } from "next-auth/react";
function Dashboard() {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatarGenerated, setAvatarGenerated] = useState(false);
  const { data: session, status } = useSession();

  const handleImageUpload = (e: any) => {
    // Mock image upload
    // setUploadedImages([...uploadedImages, "image-" + (uploadedImages.length + 1)]);
  };

  const startRecording = () => {
    setIsRecording(true);
    // Mock recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setRecordingComplete(true);
    }, 3000);
  };

  const generateAvatar = () => {
    setIsGenerating(true);
    setActiveStep(3);
    // Mock generation for 5 seconds
    setTimeout(() => {
      setIsGenerating(false);
      setAvatarGenerated(true);
    }, 5000);
  };

  const resetEverything = () => {
    setUploadedImages([]);
    setRecordingComplete(false);
    setAvatarGenerated(false);
    setActiveStep(1);
  };

  return (
    <div className="min-h-screen bg-[#1a0c02] text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#2b1403]/80 backdrop-blur-md border-b border-orange-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-orange-400" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                AvatarAI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                My Avatars
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Settings
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Help
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  U
                </div>
                <span className="text-white hidden md:inline">
                  {session?.user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= 1 ? "bg-orange-500" : "bg-[#3b1d06]"
                }`}
              >
                <Camera className="w-5 h-5" />
              </div>
              <span className="mt-2 text-sm text-orange-200/70">
                Upload Photos
              </span>
            </div>
            <div
              className={`h-1 flex-1 mx-2 ${
                activeStep >= 2 ? "bg-orange-500" : "bg-[#3b1d06]"
              }`}
            ></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= 2 ? "bg-orange-500" : "bg-[#3b1d06]"
                }`}
              >
                <Mic className="w-5 h-5" />
              </div>
              <span className="mt-2 text-sm text-orange-200/70">
                Record Voice
              </span>
            </div>
            <div
              className={`h-1 flex-1 mx-2 ${
                activeStep >= 3 ? "bg-orange-500" : "bg-[#3b1d06]"
              }`}
            ></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= 3 ? "bg-orange-500" : "bg-[#3b1d06]"
                }`}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="mt-2 text-sm text-orange-200/70">
                Generate Avatar
              </span>
            </div>
          </div>
        </div>

        {/* Step Containers */}
        <div className="space-y-6">
          {/* Step 1: Upload Photos */}
          <div
            className={`bg-[#2b1403]/70 backdrop-blur-sm rounded-2xl p-8 border border-orange-800/30`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Step 1: Upload Your Photos
              </h2>
              {uploadedImages.length > 0 && activeStep === 1 && (
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 bg-orange-500 rounded-full text-white text-sm hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {activeStep === 1 ? (
              <div>
                <p className="text-orange-200/70 mb-6">
                  Upload 5-10 clear photos of your face from different angles
                  for best results.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Upload Box */}
                  <div
                    // onClick={() => document.getElementById('fileInput').click()}
                    className="h-40 border-2 border-dashed border-orange-800/50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-orange-400 mb-2" />
                    <p className="text-orange-200/70 text-sm">
                      Click to upload
                    </p>
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      multiple
                    />
                  </div>

                  {/* Uploaded Images */}
                  {uploadedImages.map((img, index) => (
                    <div
                      key={index}
                      className="h-40 bg-[#3b1d06] rounded-xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="w-12 h-12 text-orange-400/50" />
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 bg-orange-800/80 rounded-full flex items-center justify-center">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-2 px-3">
                        <p className="text-xs text-white truncate">{img}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-orange-200/70 text-sm">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>{uploadedImages.length} photos uploaded</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#3b1d06]/50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{uploadedImages.length} photos uploaded</span>
                  </div>
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-orange-400 hover:text-orange-300 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Record Voice */}
          <div
            className={`bg-[#2b1403]/70 backdrop-blur-sm rounded-2xl p-8 border border-orange-800/30 ${
              activeStep < 2 ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Step 2: Record Your Voice
              </h2>
              {recordingComplete && activeStep === 2 && (
                <button
                  onClick={() => generateAvatar()}
                  className="px-4 py-2 bg-orange-500 rounded-full text-white text-sm hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {activeStep === 2 ? (
              <div>
                <p className="text-orange-200/70 mb-6">
                  Record a short voice sample to ensure your avatar's voice
                  matches yours perfectly.
                </p>

                <div className="bg-[#3b1d06] rounded-xl p-8 flex flex-col items-center justify-center">
                  {!isRecording && !recordingComplete ? (
                    <div className="text-center">
                      <div
                        className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-orange-600 transition-colors"
                        onClick={startRecording}
                      >
                        <Mic className="w-8 h-8" />
                      </div>
                      <p className="text-orange-200/70 mb-2">
                        Click to start recording
                      </p>
                      <p className="text-orange-200/40 text-sm">
                        Please read the following text:
                      </p>
                      <p className="text-white mt-4 p-4 bg-[#2b1403] rounded-lg">
                        "The quick brown fox jumps over the lazy dog. Voice
                        technology has improved significantly in recent years."
                      </p>
                    </div>
                  ) : isRecording ? (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                        <Mic className="w-8 h-8" />
                      </div>
                      <p className="text-orange-200/70 mb-2">
                        Recording in progress...
                      </p>
                      <div className="h-10 bg-[#2b1403] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Check className="w-8 h-8" />
                      </div>
                      <p className="text-orange-200/70 mb-2">
                        Recording complete!
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button className="px-4 py-2 bg-[#3b1d06] rounded-full text-white text-sm hover:bg-[#4b2507] transition-colors flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Play
                        </button>
                        <button
                          onClick={startRecording}
                          className="px-4 py-2 bg-[#3b1d06] rounded-full text-white text-sm hover:bg-[#4b2507] transition-colors flex items-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Record Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : activeStep > 2 ? (
              <div className="bg-[#3b1d06]/50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Voice sample recorded</span>
                  </div>
                  <button
                    onClick={() => setActiveStep(2)}
                    className="text-orange-400 hover:text-orange-300 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-orange-200/70 text-center py-8">
                <Mic className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Complete previous step to unlock</p>
              </div>
            )}
          </div>

          {/* Step 3: Generate Avatar */}
          <div
            className={`bg-[#2b1403]/70 backdrop-blur-sm rounded-2xl p-8 border border-orange-800/30 ${
              activeStep < 3 ? "opacity-60" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-6">
              Step 3: Generate Your Avatar
            </h2>

            {activeStep === 3 ? (
              <div>
                {isGenerating ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      <div className="absolute inset-0 rounded-full border-4 border-orange-500/20"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
                      <div className="absolute inset-2 rounded-full bg-[#2b1403] flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-orange-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Creating Your Avatar
                    </h3>
                    <p className="text-orange-200/70 max-w-md mx-auto mb-8">
                      Our AI is processing your photos and voice sample to
                      create a lifelike avatar. This may take a few minutes.
                    </p>
                    <div className="max-w-md mx-auto bg-[#3b1d06] rounded-full h-2 overflow-hidden">
                      <div className="bg-orange-500 h-full w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                ) : avatarGenerated ? (
                  <div className="text-center">
                    <div className="bg-[#3b1d06] rounded-xl overflow-hidden mb-6 aspect-video flex items-center justify-center max-w-3xl mx-auto">
                      {/* Avatar Preview Container */}
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="w-16 h-16 text-orange-400/50" />
                        </div>
                        {/* Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 flex items-center">
                          <button className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                            <Play className="w-4 h-4 ml-0.5" />
                          </button>
                          <div className="h-1 bg-[#2b1403] rounded-full flex-1 overflow-hidden">
                            <div className="h-full bg-orange-500 w-1/3"></div>
                          </div>
                          <span className="text-xs text-white ml-3">
                            00:15 / 00:45
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      <button className="px-6 py-3 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Download Avatar
                      </button>
                      <button className="px-6 py-3 bg-[#3b1d06] rounded-full text-white hover:bg-[#4b2507] transition-colors flex items-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Share
                      </button>
                      <button
                        onClick={resetEverything}
                        className="px-6 py-3 bg-[#3b1d06] rounded-full text-white hover:bg-[#4b2507] transition-colors flex items-center gap-2"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Create New Avatar
                      </button>
                    </div>

                    <div className="bg-[#3b1d06]/50 p-4 rounded-xl max-w-3xl mx-auto">
                      <h3 className="font-semibold mb-2">Additional Options</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-[#2b1403] p-3 rounded-lg cursor-pointer hover:bg-[#4b2507]">
                          <p>Change Background</p>
                        </div>
                        <div className="bg-[#2b1403] p-3 rounded-lg cursor-pointer hover:bg-[#4b2507]">
                          <p>Add Text Script</p>
                        </div>
                        <div className="bg-[#2b1403] p-3 rounded-lg cursor-pointer hover:bg-[#4b2507]">
                          <p>Change Clothes</p>
                        </div>
                        <div className="bg-[#2b1403] p-3 rounded-lg cursor-pointer hover:bg-[#4b2507]">
                          <p>Add Animation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-orange-400/50" />
                    <h3 className="text-lg font-medium mb-2">
                      Ready to Generate Your Avatar
                    </h3>
                    <p className="text-orange-200/70 max-w-md mx-auto mb-8">
                      We'll use your uploaded photos and voice recording to
                      create a personalized AI avatar.
                    </p>
                    <button
                      onClick={generateAvatar}
                      className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
                    >
                      <Sparkles className="w-5 h-5" />
                      GENERATE AVATAR
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-orange-200/70 text-center py-8">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Complete previous steps to unlock</p>
              </div>
            )}
          </div>
          <div className="w-full flex mt-5 flex-col gap-5 justify-center font-bold items-center">
            <div className="text-white/[0.4]   text-[24px]">or</div>
            <button
              // onClick={() => {
              //   HandleCreateAvatar();
              // }}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Camera className="w-5 h-5" />
              CREATE YOUR AVATAR
              {/* {loading && <Loader className="animate-spin w-5 h-5" />} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
