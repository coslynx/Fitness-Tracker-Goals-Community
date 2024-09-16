"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useUser } from "@/lib/hooks/useUser";

export default function Header() {
  const { data: session } = useSession();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Fitness Tracker
        </Link>
        <nav className="flex space-x-4">
          {session ? (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/goals" className="hover:underline">
                Goals
              </Link>
              <Link href="/progress" className="hover:underline">
                Progress
              </Link>
              <Link href="/social" className="hover:underline">
                Social Feed
              </Link>
              <Link href="/profile" className="hover:underline">
                Profile
              </Link>
              <button
                onClick={() => session.user.id && session.user.id.toString()}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:underline">
                Login
              </Link>
              <Link href="/auth/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}