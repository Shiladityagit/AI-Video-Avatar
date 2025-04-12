"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const HandleCreateAvatar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && status === "authenticated") {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
};
