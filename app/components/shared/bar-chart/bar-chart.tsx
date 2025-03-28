// page.js this is the entry point of application

import dynamic from "next/dynamic";
import "chart.js/auto";
import Image from "next/image";

interface Props {
  count: number[];
}

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: true,
});
const BarChart = ({ count }: Props) => {
  const data = {
    labels: ["Exceptional", "Recommended", "Meh", "Skip"],
    datasets: [
      {
        label: "User Ratings",
        data: count,
        backgroundColor: ["#373737", "#373737", "#373737", "#373737"],
        borderColor: ["#606060", "#606060", "#606060", "#606060"],
        borderWidth: 1,
        borderRadius: 2, // 🎉 This adds rounded corners!
      },
    ],
  };
  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    barThickness: 30,
  };
  return (
    <div className="w-[400px] max-sm:w-[370px] h-[200px]">
      <div className="flex items-center gap-2 pb-4">
        <Image src={"/svg/star.svg"} alt="ratings" width={20} height={20} />
        <h1 className="text-lg text-primary-300">User Ratings</h1>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};
export default BarChart;
