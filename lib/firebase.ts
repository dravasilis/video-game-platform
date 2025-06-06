import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAMMzA0dN2-tNwUwCNnXzr-7m8o72bB4As",
    authDomain: "video-game-platform.firebaseapp.com",
    projectId: "video-game-platform",
    storageBucket: "video-game-platform.firebasestorage.app",
    messagingSenderId: "334334901567",
    appId: "1:334334901567:web:9c92cca8ffa4cf3ee2678a",
    measurementId: "G-RJNS6DCLN1"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
