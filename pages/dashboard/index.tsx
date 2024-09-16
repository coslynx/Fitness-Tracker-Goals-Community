"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { useUser } from "@/lib/hooks/useUser";
import { useGoals } from "@/lib/hooks/useGoals";
import { useProgress } from "@/lib/hooks/useProgress";
import { useSocialFeed } from "@/lib/hooks/useSocialFeed";
import { Loader } from "@/components/common/Loader";
import { GoalCard } from "@/components/utils/GoalCard";
import { UserProfile } from "@/components/utils/UserProfile";
import { GoalForm } from "@/components/features/goals/GoalForm";

export default function Home() {
  const { data: session } = useSession();
  const { user, isLoading: userLoading } = useUser();
  const { goals, isLoading: goalsLoading } = useGoals();
  const { progress, isLoading: progressLoading } = useProgress();
  const { socialFeed, isLoading: socialFeedLoading } = useSocialFeed();
  const [selectedGoal, setSelectedGoal] = useState<null | string>(null);

  useEffect(() => {
    if (!session) return;
  }, [session]);

  if (userLoading || goalsLoading || progressLoading || socialFeedLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-700">Please log in to view your dashboard</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <UserProfile user={user} />
      <div className="container mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">My Goals</h2>
        <GoalForm />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              progress={progress.filter((item) => item.goalId === goal.id)}
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
            />
          ))}
        </div>
      </div>
      <div className="container mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Social Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialFeed.map((post) => (
            <div key={post.id} className="bg-white rounded-md shadow-md p-4">
              <p className="text-gray-700 font-medium mb-2">{post.content}</p>
              <p className="text-gray-500 text-sm">{post.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}