import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MemoryAndSwapBarGraph = ({ data }) => {
  if (!data) {
    return <div>No memory and swap data available</div>;
  }

  const { Mem_total, Mem_used, Mem_free, Swap_total, Swap_used, Swap_free, "@timestamp": timestamp } = data;

  const chartData = {
    labels: ["Memory", "Swap"], // 두 그룹: Memory와 Swap
    datasets: [
      {
        label: "Total",
        data: [Mem_total, Swap_total],
        backgroundColor: "rgba(75,192,192,0.8)", // 총량 색상
      },
      {
        label: "Used",
        data: [Mem_used, Swap_used],
        backgroundColor: "rgba(153,102,255,0.8)", // 사용량 색상
      },
      {
        label: "Free",
        data: [Mem_free, Swap_free],
        backgroundColor: "rgba(255,159,64,0.8)", // 여유량 색상
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 컨테이너 크기에 맞춤
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Memory and Swap Usage at ${new Date(timestamp).toLocaleString()}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Usage",
        },
      },
      y: {
        title: {
          display: true,
          text: "Usage (in KB)",
        },
      },
    },
  };

  return (
    <div className="w-full h-full max-h-[500px] flex justify-center items-center p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MemoryAndSwapBarGraph;