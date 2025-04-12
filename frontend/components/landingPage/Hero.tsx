import { Camera, Loader, Play } from "lucide-react";
// import { HandleCreateAvatar } from "./CreateAvatarButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Hero = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const HandleCreateAvatar = () => {
    setLoading(true);
    try {
      if (session && status === "authenticated") {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#7c4a2a1a_1px,transparent_1px),linear-gradient(to_bottom,#7c4a2a1a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-900/40 via-amber-800/30 to-transparent rounded-full blur-3xl -z-10"></div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Create Stunning AI Video Avatars in Minutes
          </h1>
          <p className="text-xl text-orange-200/70 mb-12">
            Transform your photos and voice into lifelike video avatars using
            cutting-edge AI technology
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                HandleCreateAvatar();
              }}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Camera className="w-5 h-5" />
              CREATE YOUR AVATAR
              {loading && <Loader className="animate-spin w-5 h-5" />}
            </button>
            <button className="px-8 py-4 bg-[#3b1d06] rounded-full text-white font-medium hover:bg-[#4b2507] transition-colors flex items-center gap-2">
              <Play className="w-5 h-5" />
              VIEW EXAMPLES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
