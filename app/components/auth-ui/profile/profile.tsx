"use client";
import { AppUser } from "@/app/models/user";
import Link from "next/link";
import React, { useState } from "react";
import heartEmpty from "../../../../public/svg/heartEmpty.svg";
import profile from "../../../../public/svg/profile.svg";
import Image from "next/image";
import logoutSvg from "../../../../public/svg/logout.svg";
import { auth } from "@/lib/firebase";

interface Props {
  currentUser: AppUser;
}
const Profile = ({ currentUser }: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      await auth.signOut();
      // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };
  return (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown((curr) => !curr)}
        className="text-sm flex gap-2 items-center text-primary-300 hover:text-white active:scale-95"
      >
        <Image
          src={profile}
          alt="heart"
          width={25}
          height={25}
          className="!w-[25px] !h-[25px] animate-drop-down"
        />
        {currentUser.displayName}
      </button>
      {openDropdown && (
        <div className="absolute shadow-lg bg-[#303336]  flex flex-col   duration-150 top-7 -left-22  rounded-sm w-[11rem] animate-drop-down">
          <Link
            href={"/favorites"}
            className="text-sm flex gap-2 text-primary-300 px-4 py-2 hover:bg-[#44484d] rounded-sm"
          >
            <Image
              src={heartEmpty}
              alt="heart"
              width={20}
              height={20}
              className="!w-[20px] !h-[20px] animate-drop-down"
            />
            My favorites list
          </Link>
          <button
            onClick={handleLogout}
            className="flex text-primary-300 text-sm gap-2 px-4 py-2 hover:bg-[#44484d] rounded-sm"
          >
            <Image src={logoutSvg} alt="logout" width={20} height={20} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
