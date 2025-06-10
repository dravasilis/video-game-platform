"use client";
import React, { useEffect, useState } from "react";
import LoginButton from "./login-button/login-button";
import LoginPopup from "./login-modal/login-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFirebaseUser,
  removeUser,
  selectUser,
} from "@/redux/features/user/userSlice";
import logoutSvg from "../../../public/svg/logout.svg";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { AppDispatch } from "@/redux/store";
const AuthUi = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    console.log(showLoginModal);
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      await auth.signOut();
      dispatch(removeUser());
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };
  useEffect(() => {
    dispatch(fetchFirebaseUser());
  }, []);
  return (
    <>
      {currentUser.user ? (
        <div className="flex items-center gap-2 z-10">
          <span className="text-sm text-primary-150 ">
            {currentUser.user.displayName}
          </span>
          <button onClick={handleLogout}>
            <Image src={logoutSvg} alt="logout" width={20} height={20} />
          </button>
        </div>
      ) : (
        <>
          <LoginButton onClick={() => setShowLoginModal(true)}></LoginButton>
          {showLoginModal && (
            <LoginPopup
              onClose={() => {
                setShowLoginModal(false);
                document.body.style.overflow = "auto";
              }}
            ></LoginPopup>
          )}
        </>
      )}
    </>
  );
};

export default AuthUi;
