"use client";
import { auth } from "@/lib/firebase";
import { fetchFirebaseUser } from "@/redux/features/user/userSlice";
import { AppDispatch } from "@/redux/store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import bow from "../../../../public/svg/bow.svg";
import sword from "../../../../public/svg/sword.svg";
import weapons from "../../../../public/svg/weapons.svg";
import CustomInput from "../../shared/custom-input/custom-input";
import "./login-modal.scss";

interface Props {
  onClose: () => void;
}

const LoginPopup = ({ onClose }: Props) => {
  const [selectedTab, setSelectedTab] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [triggerCheck, setTriggerCheck] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (authType: "signIn" | "signUp") => {
    try {
      setTriggerCheck(true);
      authType === "signIn" && (await signIn());
      authType === "signUp" && (await signUp());
      onClose();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const signIn = async () => {
    if (!email || !password) return;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async () => {
    if (!email || !password || !username) return;
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    await createUserWithEmailAndPassword(auth, email, password);
    if (!auth.currentUser) throw new Error("User is not authenticated");
    await updateProfile(auth.currentUser, { displayName: username });
    dispatch(fetchFirebaseUser()); // Manually trigger your user fetch
  };

  const resetValues = () => {
    setEmail(null);
    setPassword(null);
    setConfirmPassword(null);
    setUsername(null);
    setTriggerCheck(false);
  };

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
        style={{
          background: "linear-gradient(124deg, #121b21 53%, #18242c 100%)",
        }}
        className="flex flex-col gap-4  animate-fade-in rounded-md shadow-lg w-[30rem]"
      >
        {/* TABS  */}
        <div className="flex items-center justify-around">
          <button
            onClick={() => {
              setSelectedTab("signIn");
              resetValues();
            }}
            className={`tab  rounded-s-lg duration-300 ${
              selectedTab === "signIn" ? "!bg-[#4d535e]" : ""
            }`}
          >
            <Image
              className={`duration-150 ${
                selectedTab === "signIn" ? "opacity-100" : "opacity-0"
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
              selectedTab === "signUp" ? "!bg-[#4d535e]" : ""
            }`}
            onClick={() => {
              setSelectedTab("signUp");
              resetValues();
            }}
          >
            <Image
              className={`duration-150 ${
                selectedTab === "signUp" ? "opacity-100" : "opacity-0"
              }`}
              src={weapons}
              alt="weapons"
              width={20}
              height={20}
            />
            Create account
          </button>
        </div>
        <div className="flex flex-col gap-8 pt-2 pb-8">
          {/* SIGNIN CONTENT  */}
          {selectedTab === "signIn" ? (
            <div className="flex flex-col gap-3  pt-4">
              <CustomInput
                label="Email*"
                placeholder="Type your email here..."
                isRequired={true}
                triggerCheck={triggerCheck}
                value={email}
                emitValue={(value) => {
                  setEmail(value);
                }}
              ></CustomInput>
              <CustomInput
                label="Password*"
                isRequired={true}
                triggerCheck={triggerCheck}
                placeholder="Type your password here..."
                value={password}
                type="password"
                emitValue={(value) => setPassword(value)}
              ></CustomInput>
            </div>
          ) : (
            // SIGNUP CONTENT
            <div className="flex flex-col gap-3  pt-4">
              <CustomInput
                label="Email*"
                isRequired={true}
                placeholder="Type your email here..."
                value={email}
                triggerCheck={triggerCheck}
                emitValue={(value) => setEmail(value)}
              ></CustomInput>
              <CustomInput
                label="Password*"
                placeholder="Type your password here..."
                isRequired={true}
                value={password}
                type="password"
                triggerCheck={triggerCheck}
                emitValue={(value) => setPassword(value)}
              ></CustomInput>
              <CustomInput
                label="Confirm password*"
                placeholder="Type your password again here..."
                value={confirmPassword}
                isRequired={true}
                type="password"
                triggerCheck={triggerCheck}
                emitValue={(value) => setConfirmPassword(value)}
              ></CustomInput>
              <CustomInput
                label="Username*"
                isRequired={true}
                value={username}
                triggerCheck={triggerCheck}
                placeholder="Type your username here..."
                emitValue={(value) => setUsername(value)}
              ></CustomInput>
            </div>
          )}
          {/* FOOTER  */}
          <button
            onClick={() => handleLogin(selectedTab)}
            className="submit-button underlineEffect  "
          >
            {selectedTab === "signIn" ? (
              <>
                <Image src={sword} alt="weapons" width={20} height={20} />
                <span>Sign in</span>
              </>
            ) : (
              <>
                <Image src={bow} alt="weapons" width={20} height={20} />
                <span> Create account</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
