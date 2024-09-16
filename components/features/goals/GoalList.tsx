"use client";

import { useState, useEffect } from "react";
import { useGoals } from "@/lib/hooks/useGoals";
import { GoalCard } from "@/components/utils/GoalCard";
import { GoalForm } from "@/components/features/goals/GoalForm";
import { Loader } from "@/components/common/Loader";

export default function GoalList() {
  const { goals, isLoading } = useGoals();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">My Goals</h2>
      <GoalForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}