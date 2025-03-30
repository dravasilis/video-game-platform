// page.js this is the entry point of application

import "chart.js/auto";
import dynamic from "next/dynamic";
import "./bar-chart.scss";
import Image from "next/image";
import star from "@/public/svg/star.svg";
import emptyStar from "@/public/svg/emptyStar.svg";
interface Props {
	count: number[];
	percents: number[];
	total: number;
	rating: number;
}

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
	ssr: true,
});
const BarChart = ({ count, total, percents, rating }: Props) => {
	const data = {
		labels: [
			`Exceptional (${percents[0].toPrecision(2)}%)`,
			`Recommended (${percents[1].toPrecision(2)}%)`,
			`Meh (${percents[2].toPrecision(2)}%)`,
			`Skip (${percents[3].toPrecision(2)}%)`,
		],
		datasets: [
			{
				label: `${total.toLocaleString()} Ratings`,
				data: count,
				backgroundColor: ["#fff", "#fff", "#fff", "#fff"],
				borderColor: ["#fff0", "#fff0", "#fff0", "#fff0"],
				borderWidth: 1,
				borderRadius: 5, // 🎉 This adds rounded corners!
			},
		],
	};
	const options = {
		indexAxis: "y" as const, // Keeps horizontal bars
		scales: {
			x: {
				grid: {
					display: false, // Hide grid lines on the x-axis
				  },beginAtZero: true,
				ticks: {
					color: "#d0d0d0",
					font: { size: 14 },
				},
			},
			y: {
				grid: {
					display: false, // Hide grid lines on the x-axis
				  },beginAtZero: true,
				ticks: {
					color: "#d0d0d0",
					font: { size: 16 },
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					title: (tooltipItems: any) => {
						return `${tooltipItems[0].label}`;
					},
					label: (tooltipItem: any) => {
						const value = tooltipItem.raw;
						return `  ${Number(value).toLocaleString()} users`;
					},
				},
				titleFont: { size: 16 },
				bodyFont: { size: 15 },
				padding: 10,
				titleColor: "#ffffff",
				bodyColor: "#ffffff",
			},
		},
		maintainAspectRatio: false,
		barThickness: 10,
	};
	return (
		<>
			<div className="flex items-center gap-2 pb-4">
				<h2 className="h2 text-primary-100">Ratings</h2>
			</div>
			<div className="chartContainer flex flex-col items-start w-full h-[500px] max-sm:h-[350px] ">
				<div className="flex w-full px-8 max-sm:px-2 py-2">
					<span className="w-full max-lg:hidden">Global player ratings</span>
					<div className="flex w-full items-end justify-end gap-4  ">
						<span className="text-3xl max-sm:text-2xl">{rating}</span>
						{Array.from({ length: Math.round(rating) }).map((_, index) => (
							<Image className="max-sm:w-[30px]"
								src={star}
								key={index}
								alt="star"
								width={35}
								height={35}
							></Image>
						))}
						{Array.from({ length: 5 - Math.round(rating) }).map((_, index) => (
							<Image className="max-sm:w-[30px]"
								src={emptyStar}
								key={index}
								alt="emptyStar"
								width={35}
								height={35}
							></Image>
						))}
					</div>
				</div>
				<h3 className="text-primary-350 text-sm w-full text-end pr-8 max-sm:pr-2 pt-2">
					{total.toLocaleString()} ratings
				</h3>
				<Bar data={data} options={options} />
			</div>
		</>
	);
};
export default BarChart;
