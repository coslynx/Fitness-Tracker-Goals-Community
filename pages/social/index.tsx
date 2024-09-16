"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { useUser } from "@/lib/hooks/useUser";
import { useSocialFeed } from "@/lib/hooks/useSocialFeed";
import { Loader } from "@/components/common/Loader";
import { PostForm } from "@/components/features/social/PostForm";
import { PostList } from "@/components/features/social/PostList";

export default function Social() {
  const { data: session } = useSession();
  const { user, isLoading: userLoading } = useUser();
  const { socialFeed, isLoading: socialFeedLoading } = useSocialFeed();

  useEffect(() => {
    if (!session) return;
  }, [session]);

  if (userLoading || socialFeedLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-700">
          Please log in to view the social feed
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="container mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Social Feed</h2>
        <PostForm />
        <PostList posts={socialFeed} />
      </div>
    </div>
  );
}