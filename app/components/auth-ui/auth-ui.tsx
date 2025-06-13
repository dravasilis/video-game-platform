"use client";
import { auth } from "@/lib/firebase";
import {
  selectLoginModalStatus,
  setLoginModalOpen,
} from "@/redux/features/loginModal/loginModalSlice";
import { fetchFirebaseUser, selectUser } from "@/redux/features/user/userSlice";
import { AppDispatch } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from "./login-button/login-button";
import LoginPopup from "./login-modal/login-modal";
import Profile from "./profile/profile";
const AuthUi = () => {
  const openLoginModal = useSelector(selectLoginModalStatus);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
      await dispatch(fetchFirebaseUser()); // This will trigger on every auth change
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch]);
  return (
    <>
      {currentUser.user ? (
        <div className="flex items-center gap-2 z-20">
          <Profile currentUser={currentUser.user} />
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
