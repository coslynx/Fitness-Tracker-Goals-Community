"use client";

import { UserProfileProps } from "@/types";
import Image from "next/image";

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Image
        src={user.image || "/images/default-profile.png"}
        alt={user.name}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-700">{user.name}</h3>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};