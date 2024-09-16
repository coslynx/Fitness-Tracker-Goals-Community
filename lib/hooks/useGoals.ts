"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/lib/store";
import { prisma } from "@/lib/db";

export const useGoals = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchGoals = async () => {
      try {
        const goalsData = await prisma.goal.findMany({
          where: { userId: session.user.id },
          orderBy: { targetDate: "asc" },
          include: {
            progress: true,
          },
        });
        setGoals(goalsData);
        store.setGoals(goalsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching goals data:", error);
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [session]);

  const createGoal = async (goal: any) => {
    if (!session) return;

    try {
      const newGoal = await prisma.goal.create({
        data: {
          ...goal,
          userId: session.user.id,
        },
      });
      setGoals([newGoal, ...goals]);
      store.setGoals([newGoal, ...store.goals]);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const updateGoal = async (id: number, goal: any) => {
    if (!session) return;

    try {
      const updatedGoal = await prisma.goal.update({
        where: { id },
        data: {
          ...goal,
        },
      });
      setGoals((prevGoals) =>
        prevGoals.map((item) => (item.id === updatedGoal.id ? updatedGoal : item))
      );
      store.setGoals((prevGoals) =>
        prevGoals.map((item) => (item.id === updatedGoal.id ? updatedGoal : item))
      );
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const deleteGoal = async (id: number) => {
    if (!session) return;

    try {
      await prisma.goal.delete({
        where: { id },
      });
      setGoals((prevGoals) => prevGoals.filter((item) => item.id !== id));
      store.setGoals((prevGoals) => prevGoals.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return { goals, isLoading, createGoal, updateGoal, deleteGoal };
};