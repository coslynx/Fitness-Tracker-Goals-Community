"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@/lib/hooks/useProgress";
import { ProgressData } from "@/types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title
);

interface ProgressCardProps {
  goal: {
    id: number;
    name: string;
    targetValue: number;
  };
}

const ProgressCard: React.FC<ProgressCardProps> = ({ goal }) => {
  const { progress } = useProgress();

  const goalProgress = progress.filter((item) => item.goalId === goal.id);
  const data: ProgressData = {
    labels: goalProgress.map((item) =>
      item.date.toISOString().slice(0, 10)
    ),
    datasets: [
      {
        label: "Progress",
        data: goalProgress.map((item) => item.value),
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Progress for ${goal.name}`,
      },
    },
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h3 className="text-xl font-bold text-gray-700 mb-2">{goal.name}</h3>
      <p className="text-gray-500 mb-2">
        Target Value: {goal.targetValue}
      </p>
      <div className="mt-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ProgressCard;