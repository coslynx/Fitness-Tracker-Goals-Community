"use client";

import { useSession } from "next-auth/react";
import { Link } from "next/link";

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Fitness Tracker MVP
          </p>
        </div>
        <div className="flex space-x-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          {session && (
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}