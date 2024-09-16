"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { prisma } from "@/lib/db";

export const useSocialFeed = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [socialFeed, setSocialFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchPosts = async () => {
      try {
        const posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        });
        setSocialFeed(posts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching social feed posts:", error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [session]);

  const createPost = async (content: string) => {
    if (!session) return;

    try {
      const newPost = await prisma.post.create({
        data: {
          content,
          userId: session.user.id,
        },
      });
      setSocialFeed([newPost, ...socialFeed]);
    } catch (error) {
      console.error("Error creating social feed post:", error);
    }
  };

  return {
    socialFeed,
    isLoading,
    createPost,
  };
};