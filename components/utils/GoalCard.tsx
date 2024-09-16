"use client";

import { GoalCardProps } from "@/types";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { ProgressCard } from "@/components/features/progress/ProgressCard";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  progress,
  selectedGoal,
  setSelectedGoal,
}) => {
  const router = useRouter();
  const store = useStore();
  const [showModal, setShowModal] = useState(false);

  const handleGoalSelect = () => {
    setSelectedGoal(goal.id.toString());
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        onClick={handleGoalSelect}
        className={`bg-white rounded-md shadow-md p-4 cursor-pointer ${
          selectedGoal === goal.id.toString()
            ? "border-2 border-blue-500"
            : ""
        }`}
      >
        <h3 className="text-xl font-bold text-gray-700 mb-2">{goal.name}</h3>
        <p className="text-gray-500 mb-2">
          Target Value: {goal.targetValue}
        </p>
        <p className="text-gray-500 mb-2">Target Date: {goal.targetDate}</p>
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={`Progress for ${goal.name}`}
      >
        <ProgressCard goal={goal} />
      </Modal>
    </>
  );
};