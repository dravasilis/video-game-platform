import "./stat.scss";

import React from "react";
interface props {
	title: string;
	count: string;
	svg: string;
}

const StatCard = ({ title, count, svg }: props) => {
	return (
		<div className="flex items-center gap-4 pt-10 pb-36">
			<div className="stat-card">
				<div className="tracking-wide flex gap-4 items-center">
					<img src={`/svg/${svg}.svg`} alt="stat-svg" width={30} />
					<span className="text-2xl ">{title}</span>
				</div>
				<span className="text-4xl font-bold text-primary-150">{count}</span>
			</div>
		</div>
	);
};

export default StatCard;
