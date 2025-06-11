"use client";
import { auth } from "@/lib/firebase";
import {
  selectLoginModalStatus,
  setLoginModalOpen,
} from "@/redux/features/loginModal/loginModalSlice";
import { fetchFirebaseUser, selectUser } from "@/redux/features/user/userSlice";
import { AppDispatch } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logoutSvg from "../../../public/svg/logout.svg";
import LoginButton from "./login-button/login-button";
import LoginPopup from "./login-modal/login-modal";
const AuthUi = () => {
  const openLoginModal = useSelector(selectLoginModalStatus);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      await auth.signOut();
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await dispatch(fetchFirebaseUser()); // This will trigger on every auth change
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch]);
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
          <LoginButton
            onClick={() => dispatch(setLoginModalOpen(true))}
          ></LoginButton>
          {openLoginModal && (
            <LoginPopup
              onClose={() => {
                dispatch(setLoginModalOpen(false));
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
