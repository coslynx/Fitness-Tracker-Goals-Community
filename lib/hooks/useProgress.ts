"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/lib/store";
import { prisma } from "@/lib/db";

export const useProgress = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchProgress = async () => {
      try {
        const progressData = await prisma.progress.findMany({
          where: { userId: session.user.id },
          include: {
            goal: {
              select: {
                id: true,
                name: true,
                targetValue: true,
              },
            },
          },
        });
        setProgress(progressData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching progress data:", error);
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [session]);

  const createProgress = async (goalId: number, value: number, date: Date) => {
    if (!session) return;

    try {
      const newProgress = await prisma.progress.create({
        data: {
          goalId,
          userId: session.user.id,
          value,
          date,
        },
      });
      setProgress([newProgress, ...progress]);
    } catch (error) {
      console.error("Error creating progress entry:", error);
    }
  };

  const updateProgress = async (id: number, value?: number, date?: Date) => {
    if (!session) return;

    try {
      const updatedProgress = await prisma.progress.update({
        where: { id },
        data: {
          value,
          date,
        },
      });
      setProgress((prevProgress) =>
        prevProgress.map((item) =>
          item.id === updatedProgress.id ? updatedProgress : item
        )
      );
    } catch (error) {
      console.error("Error updating progress entry:", error);
    }
  };

  const deleteProgress = async (id: number) => {
    if (!session) return;

    try {
      await prisma.progress.delete({
        where: { id },
      });
      setProgress((prevProgress) =>
        prevProgress.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting progress entry:", error);
    }
  };

  return { progress, isLoading, createProgress, updateProgress, deleteProgress };
};