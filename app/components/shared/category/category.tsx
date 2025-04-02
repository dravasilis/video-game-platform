import { Category } from "@/app/constants/categories";
import React from "react";
import Image from "next/image";
import "./category.scss";
interface Props {
  category: Category;
}
import nextSvg from "../../../../public/svg/next.svg";
import Link from "next/link";
const GameCategory = ({ category }: Props) => {
  return (
    <>
      <Link href={category.redirectTo} className="category-container">
        <Image
          src={category.img}
          alt={category.title}
          width={1920}
          height={1080}
          className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500   text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"
        ></Image>
        <div className="p-6">
          <h5 className="mb-2 text-primary-100 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {category.title}
          </h5>
          <p className="block text-primary-150 font-sans text-base font-light leading-relaxed   antialiased">
            {category.subTitle}
          </p>
        </div>
        <div className="p-6 pt-0">
          <button className="category-button ">
            Dive in
            <Image src={nextSvg} alt="next" width={15} />
          </button>
        </div>
      </Link>
    </>
  );
};

export default GameCategory;
