import { firebaseConfig } from "@/env/environment";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
