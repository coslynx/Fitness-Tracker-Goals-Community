"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@/lib/hooks/useProgress";
import { ProgressData } from "@/types";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from "chart.js";

ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const { progress } = useProgress();

  const goalProgress = progress.filter((item) => item.goalId === goalId);
  const data: ProgressData = {
    labels: goalProgress.map((item) => item.date.toISOString().slice(0, 10)),
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
        text: "Progress Over Time",
      },
    },
  };

  return (
    <div className="mt-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressChart;