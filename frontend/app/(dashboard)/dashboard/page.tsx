"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import {
  Video,
  Camera,
  Mic,
  Upload,
  Play,
  Check,
  Sparkles,
  ArrowRight,
  X,
  RefreshCw,
  Download,
  Share2,
  Menu,
  User,
  Settings,
  LogOut,
  Info,
  AlertCircle,
} from "lucide-react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface UploadedFile {
  id: string;
  url: string;
  name: string;
  publicId: string;
}

function Dashboard() {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatarGenerated, setAvatarGenerated] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [loadingImages, setLoadingImages] = useState(false);
  const [recording, setRecording] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { data: session } = useSession();

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    if (files.some((file) => !file.type.startsWith("image/"))) {
      setError("Only image files are allowed");
      return;
    }

    setLoadingImages(true);
    setError(null);

    try {
      const uploadPromises = files.map(async (file) => {
        const id = uuidv4();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET!);
        formData.append("cloud_name", CLOUD_NAME!);
        formData.append(
          "public_id",
          `avatars/${session?.user?.email}/${file.name}_${Date.now()}`
        );

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData,
          {
            onUploadProgress: (progressEvent: any) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              );
              setUploadProgress((prev) => ({ ...prev, [id]: percent }));
            },
          }
        );

        return {
          id,
          url: response.data.secure_url,
          name: file.name,
          publicId: response.data.public_id,
        };
      });

      const results = await Promise.all(uploadPromises);
      setUploadedImages((prev) => [...prev, ...results]);

      if (uploadedImages.length === 0 && results.length > 0) {
        setActiveStep(2);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Image upload failed. Please try again.");
    } finally {
      setLoadingImages(false);
      setUploadProgress({});
    }
  };

  // Delete image
  const deleteImage = async (id: string, publicId: string) => {
    try {
      await axios.post("/api/delete-image", { publicId });
      setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete image. Please try again.");
    }
  };

  // Recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setRecordingComplete(false);
      setRecordingDuration(0);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      // Start timer
      const interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        if (timerInterval) clearInterval(timerInterval);
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        setRecording(audioBlob);
        setRecordingComplete(true);
        if (uploadedImages.length >= 3) {
          setActiveStep(3);
        }
      };

      mediaRecorder.start();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Microphone access required for voice recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerInterval) clearInterval(timerInterval);
    }
  };

  // Format recording duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Generate avatar
  const generateAvatar = async () => {
    if (uploadedImages.length < 3) {
      setError("Please upload at least 3 photos");
      return;
    }

    if (!recording) {
      setError("Please record a voice sample");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("voice", recording);
      formData.append("userId", session?.user?.email || "");
      uploadedImages.forEach((img) => {
        formData.append("images", img.url);
      });

      const response = await axios.post("/api/generate-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setAvatarGenerated(true);
      }
    } catch (error) {
      console.error("Generation failed:", error);
      setError("Avatar generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Reset everything
  const resetEverything = () => {
    setUploadedImages([]);
    setRecordingComplete(false);
    setAvatarGenerated(false);
    setActiveStep(1);
    setRecording(null);
    setError(null);
  };

  // Cleanup recordings
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120801] to-[#1a0c02] text-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-[#2b1403]/90 backdrop-blur-md border-b border-orange-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Sparkles className="w-8 h-8 text-orange-400" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  AvatarAI
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-1">
                <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30">
                  <span className="text-sm font-medium text-orange-300">
                    Pro Account
                  </span>
                </div>
              </div>

              <div className="relative group">
                <button className="p-2 rounded-full hover:bg-orange-800/30 transition-colors">
                  <User className="w-5 h-5 text-orange-300" />
                </button>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-[#2b1403] rounded-xl border border-orange-800/30 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-orange-200 hover:bg-orange-800/30"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-orange-200 hover:bg-orange-800/30"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    activeStep >= step
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-900/30"
                      : "bg-orange-900/50 text-orange-300/50"
                  } transition-all duration-300`}
                >
                  {step === 1 && <Camera className="w-5 h-5" />}
                  {step === 2 && <Mic className="w-5 h-5" />}
                  {step === 3 && <Sparkles className="w-5 h-5" />}
                </div>
                {step < 3 && (
                  <div
                    className={`w-24 h-1 mx-2 rounded-full ${
                      activeStep > step
                        ? "bg-gradient-to-r from-orange-500 to-amber-500"
                        : "bg-orange-900/50"
                    } transition-all duration-300`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between max-w-2xl mx-auto">
            <div className="text-center w-24">
              <p className="text-sm text-orange-300">Upload Photos</p>
            </div>
            <div className="text-center w-24">
              <p className="text-sm text-orange-300">Record Voice</p>
            </div>
            <div className="text-center w-24">
              <p className="text-sm text-orange-300">Generate Avatar</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/40 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Step Containers */}
        <div className="space-y-8">
          {/* Step 1: Upload Photos */}
          <div
            className={`bg-gradient-to-br from-[#2b1403]/80 to-[#3b1d06]/60 backdrop-blur-sm rounded-2xl p-8 border ${
              activeStep === 1
                ? "border-orange-500/40 shadow-lg shadow-orange-900/10"
                : "border-orange-800/30"
            } transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-orange-200">
                Upload Photos
              </h2>
              <div className="relative">
                <button
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Info className="w-5 h-5" />
                </button>
                {showTooltip && (
                  <div className="absolute right-0 w-64 p-3 bg-[#2b1403] rounded-lg border border-orange-800/30 text-xs text-orange-200 z-10">
                    Upload at least 3 clear photos of your face from different
                    angles for best results. We recommend including front,
                    profile, and 3/4 angle shots.
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="h-48 border-2 border-dashed border-orange-800/50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors group">
                {loadingImages ? (
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-orange-400 mb-2 animate-spin" />
                    <p className="text-orange-200/70 text-sm">Uploading...</p>
                    {Object.entries(uploadProgress).map(([id, progress]) => (
                      <div
                        key={id}
                        className="w-32 h-2 bg-orange-800/50 mt-2 rounded"
                      >
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors">
                      <Upload className="w-7 h-7 text-orange-400" />
                    </div>
                    <p className="text-orange-200/70 text-sm font-medium">
                      Click to upload
                    </p>
                    <p className="text-orange-200/50 text-xs mt-1">
                      {uploadedImages.length < 3
                        ? `${3 - uploadedImages.length} more ${
                            uploadedImages.length === 2 ? "photo" : "photos"
                          } needed`
                        : "Add more photos (optional)"}
                    </p>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                      disabled={loadingImages}
                    />
                  </>
                )}
              </div>

              {uploadedImages.map((img) => (
                <div
                  key={img.id}
                  className="h-48 bg-[#3b1d06] rounded-xl relative overflow-hidden group shadow-md"
                >
                  <img
                    src={img.url}
                    alt="Uploaded"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => deleteImage(img.id, img.publicId)}
                      className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-red-900/80 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-3 px-3">
                    <p className="text-sm text-white truncate">{img.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {uploadedImages.length >= 3 && activeStep === 1 && (
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center gap-2 font-medium"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Record Voice */}
          <div
            className={`bg-gradient-to-br from-[#2b1403]/80 to-[#3b1d06]/60 backdrop-blur-sm rounded-2xl p-8 border ${
              activeStep === 2
                ? "border-orange-500/40 shadow-lg shadow-orange-900/10"
                : "border-orange-800/30"
            } transition-all duration-300`}
          >
            <h2 className="text-xl font-semibold text-orange-200 mb-6">
              Record Voice Sample
            </h2>

            <div className="flex flex-col items-center">
              {isRecording ? (
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto relative">
                    <span className="absolute inset-0 rounded-full bg-red-500/50 animate-ping"></span>
                    <span className="absolute text-lg font-bold text-white">
                      {formatDuration(recordingDuration)}
                    </span>
                  </div>
                  <button
                    onClick={stopRecording}
                    className="px-6 py-3 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors font-medium"
                  >
                    Stop Recording
                  </button>
                </div>
              ) : (
                <div className="text-center mb-8">
                  <button
                    onClick={startRecording}
                    className={`px-6 py-3 ${
                      recordingComplete
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                        : "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-900/20"
                    } rounded-lg flex items-center gap-2 mx-auto font-medium transition-all hover:opacity-90`}
                  >
                    <Mic className="w-5 h-5" />
                    {recordingComplete ? "Record Again" : "Start Recording"}
                  </button>

                  {recording && (
                    <div className="mt-8 p-6 bg-[#3b1d06]/50 rounded-xl border border-orange-800/30">
                      <p className="text-orange-300 mb-4 text-sm">
                        Voice Sample
                      </p>
                      <audio
                        controls
                        src={URL.createObjectURL(recording)}
                        className="mx-auto w-full"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {recordingComplete &&
              uploadedImages.length >= 3 &&
              activeStep === 2 && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center gap-2 font-medium"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
          </div>

          {/* Step 3: Generate Avatar */}
          <div
            className={`bg-gradient-to-br from-[#2b1403]/80 to-[#3b1d06]/60 backdrop-blur-sm rounded-2xl p-8 border ${
              activeStep === 3
                ? "border-orange-500/40 shadow-lg shadow-orange-900/10"
                : "border-orange-800/30"
            } transition-all duration-300`}
          >
            <h2 className="text-xl font-semibold text-orange-200 mb-6">
              Generate Your AI Avatar
            </h2>

            {isGenerating ? (
              <div className="text-center py-16">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <Loader2 className="w-full h-full text-orange-400 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-orange-300" />
                  </div>
                </div>
                <p className="text-orange-200 text-lg font-medium mb-2">
                  Creating Your Avatar
                </p>
                <p className="text-orange-200/70">
                  This may take a few minutes...
                </p>
              </div>
            ) : avatarGenerated ? (
              <div className="text-center">
                <div className="bg-[#3b1d06] rounded-xl overflow-hidden mb-8 aspect-video flex items-center justify-center border border-orange-800/30 shadow-lg">
                  <video controls className="w-full h-full">
                    <source
                      src="/path-to-generated-avatar.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-5 py-2.5 bg-[#3b1d06] border border-orange-800/30 rounded-lg text-orange-300 hover:bg-[#4b2d16] transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Avatar
                  </button>

                  <button className="px-5 py-2.5 bg-[#3b1d06] border border-orange-800/30 rounded-lg text-orange-300 hover:bg-[#4b2d16] transition-colors flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Avatar
                  </button>

                  <button
                    onClick={resetEverything}
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Create New Avatar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg mb-8">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-orange-300 text-sm">
                        You've uploaded{" "}
                        <span className="font-medium">
                          {uploadedImages.length} photos
                        </span>{" "}
                        and recorded a{" "}
                        <span className="font-medium">
                          {recording
                            ? formatDuration(recordingDuration)
                            : "0:00"}{" "}
                          voice sample
                        </span>
                        . Ready to generate your AI avatar?
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateAvatar}
                  disabled={uploadedImages.length < 3 || !recording}
                  className={`w-full py-6 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-white font-medium text-lg shadow-lg shadow-orange-900/20 ${
                    uploadedImages.length < 3 || !recording
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90 transition-opacity"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Generate My Avatar
                  </div>
                </button>

                {(uploadedImages.length < 3 || !recording) && (
                  <p className="text-orange-400/70 text-sm text-center mt-4">
                    {uploadedImages.length < 3 && !recording
                      ? "Please upload at least 3 photos and record a voice sample"
                      : uploadedImages.length < 3
                      ? "Please upload at least 3 photos"
                      : "Please record a voice sample"}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
