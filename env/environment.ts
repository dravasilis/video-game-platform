export const environment = {
    RAWGApiKey: '85cbd3cbe95d4f7aaeb1320705603faa' //api key goes here
};

//for local environment
// export const firebaseConfig = {
//     apiKey: "AIzaSyAMMzA0dN2-tNwUwCNnXzr-7m8o72bB4As",
//     authDomain: "video-game-platform.firebaseapp.com",
//     projectId: "video-game-platform",
//     storageBucket: "video-game-platform.firebasestorage.app",
//     messagingSenderId: "334334901567",
//     appId: "1:334334901567:web:9c92cca8ffa4cf3ee2678a",
//     measurementId: "G-RJNS6DCLN1"
// };

//for deployed environment

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
