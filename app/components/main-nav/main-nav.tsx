import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logo.png";
import Search from "../../search/search";
import Link from "next/link";

interface Props {
	children: React.ReactNode;
	header?:string,
	results?:number
}
const MainNav = ({ children,header,results }: Props) => {
	return (
		<>
			<div className="flex flex-col gap-4 py-4 animate-fade-in px-4">
				{/* <Sidenav /> */}
				<div className="flex w-full justify-between  z-10">
					<Link href="/home" className="flex gap-1 items-center z-10">
						<Image
							src={logo}
							alt="favicon"
							className="w-[30px] max-sm:w-[17px] mb-1"
						/>
						<h1 className=" text-2xl text-primary-150 max-sm:text-sm font-bold flex tracking-[-2px]">
							Gamepedia
						</h1>
					</Link>
					<Search />
				</div>
				{header  &&
				<div className="flex justify-between w-full items-center z-10 px-20 max-lg:px-10 max-md:px-4 max-[540px]:!px-0 pt-8">
						<h1 className="text-5xl max-sm:text-3xl text-primary-100 font-bold  ">
						{header}
						</h1>
						<h3 className="text-primary-250 max-sm:text-xs">
							{(results??0).toLocaleString()} results
						</h3>
					</div>
					 }
				
				{children}
			</div>
		</>
	);
};

export default MainNav;
