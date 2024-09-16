"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { prisma } from "@/lib/db";

export const useUser = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchUser = async () => {
      try {
        const userData = await prisma.user.findUnique({
          where: { id: session.user.id },
        });
        setUser(userData);
        store.setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  return { user, isLoading };
};