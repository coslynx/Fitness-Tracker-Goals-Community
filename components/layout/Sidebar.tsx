"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/lib/hooks/useUser";
import { useGoals } from "@/lib/hooks/useGoals";
import { useProgress } from "@/lib/hooks/useProgress";
import { useSocialFeed } from "@/lib/hooks/useSocialFeed";
import { Link } from "next/link";
import { useStore } from "@/lib/store";

export default function Sidebar() {
  const { data: session } = useSession();
  const { user } = useUser();
  const { goals } = useGoals();
  const { progress } = useProgress();
  const { socialFeed } = useSocialFeed();
  const [selectedGoal, setSelectedGoal] = useState<null | string>(null);

  const store = useStore();

  useEffect(() => {
    if (!session) return;
  }, [session]);

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-gray-100 overflow-y-auto">
      <div className="flex items-center justify-center py-4">
        <h2 className="text-xl font-bold">Fitness Tracker</h2>
      </div>
      <div className="mt-6">
        <nav className="space-y-1">
          <Link href="/" className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 rounded-md hover:bg-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7 7 7-7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1v3a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1h3m-6 0v2a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1H6z"
              />
            </svg>
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link href="/goals" className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 rounded-md hover:bg-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508 3.42 3.42 0 001.946-.806 3.42 3.42 0 011.139.508 3.42 3.42 0 001.946.806 3.42 3.42 0 011.139-.508z"
              />
            </svg>
            <span className="ml-3">Goals</span>
          </Link>
          <Link href="/progress" className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 rounded-md hover:bg-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-3">Progress</span>
          </Link>
          <Link href="/social" className="flex items-center px-4 py-2 text-gray-100 bg-gray-700 rounded-md hover:bg-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-4.97 0-9-3.582-9-8 0-4.418 4.03-8 9-8 4.97 0 9 3.582 9 8z"
              />
            </svg>
            <span className="ml-3">Social Feed</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}