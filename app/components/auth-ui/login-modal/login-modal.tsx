"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import weapons from "../../../../public/svg/weapons.svg";
import CustomInput from "../../shared/custom-input/custom-input";
import "./login-modal.scss";

interface Props {
  onClose: () => void;
}

const LoginPopup = ({ onClose }: Props) => {
  const [selectedTab, setSelectedTab] = useState<"signin" | "signup">("signin");
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  return (
    <div
      id="overlay"
      onClick={() => onClose()}
      className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 bg-dark rounded-md shadow-lg w-[30rem]"
      >
        {/* TABS  */}
        <div className="flex items-center justify-around">
          <button
            onClick={() => setSelectedTab("signin")}
            className={`tab  rounded-s-lg duration-300 ${
              selectedTab === "signin" ? "!bg-[#4d535e]" : ""
            }`}
          >
            <Image
              className={`duration-150 ${
                selectedTab === "signin" ? "opacity-100" : "opacity-0"
              }`}
              src={weapons}
              alt="weapons"
              width={20}
              height={20}
            />
            Sign in
          </button>
          <button
            className={`tab rounded-e-lg duration-300   ${
              selectedTab === "signup" ? "!bg-[#4d535e]" : ""
            }`}
            onClick={() => setSelectedTab("signup")}
          >
            <Image
              className={`duration-150 ${
                selectedTab === "signup" ? "opacity-100" : "opacity-0"
              }`}
              src={weapons}
              alt="weapons"
              width={20}
              height={20}
            />
            Create account
          </button>
        </div>
        {/* SIGNIN CONTENT  */}
        {selectedTab === "signin" ? (
          <div className="flex flex-col gap-3  pt-4">
            <CustomInput
              label="Email"
              placeholder="'Type your email here...'"
              emitValue={(value) => console.log(value)}
            ></CustomInput>
            <CustomInput
              label="Password"
              placeholder="'Type your password here...'"
              emitValue={(value) => console.log(value)}
            ></CustomInput>
          </div>
        ) : (
          <div className="flex flex-col gap-3  pt-4">
            <CustomInput
              label="Email"
              placeholder="'Type your email here...'"
              emitValue={(value) => console.log(value)}
            ></CustomInput>
            <CustomInput
              label="Password"
              placeholder="'Type your password here...'"
              emitValue={(value) => console.log(value)}
            ></CustomInput>
          </div>
        )}
        {/* FOOTER  */}
        <button className="w-max px-4 py-2 hover:bg-primary-200/50 active:scale-95 duration-200 text-sm self-end bg-primary-200 rounded-md m-5">
          {selectedTab === "signin" ? "Sign in" : "Create account"}
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
