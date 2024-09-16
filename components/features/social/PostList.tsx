"use client";

import { PostCard } from "@/components/features/social/PostCard";
import { useSocialFeed } from "@/lib/hooks/useSocialFeed";
import { Loader } from "@/components/common/Loader";
import { useState, useEffect } from "react";

interface PostListProps {
  posts: any[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;