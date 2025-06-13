import { Auth } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { AppUser } from "../models/user";
import { Game } from "../models/game";

export const setFavorite = async (auth: Auth, game: Game, type: 'remove' | 'add') => {

    if (!auth.currentUser?.uid) return;
    const db = getFirestore();
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const gameObject = {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        metacritic: game.metacritic,
        genres: game.genres.map(genre => genre.name)
    };
    try {
        if (type === 'add') {
            await setDoc(userRef, {
                favorites: arrayUnion(gameObject)
            }, { merge: true });

        }
        else if (type === 'remove') {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const currentFavorites = docSnap.data().favorites || [];
                const gameToRemove = currentFavorites.find((fav: Game) => fav.id === game.id);

                if (gameToRemove) {
                    await updateDoc(userRef, {
                        favorites: arrayRemove(gameToRemove)
                    });
                }
            }

        }

        // @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error adding game to favorites:', error.message);
        throw error;
    }
};

export const getFavorites = async (user: AppUser) => {
    if (!user) return;
    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);
    try {
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData && userData.favorites && Array.isArray(userData.favorites)) {
                return userData.favorites;
            } else {
                return []; // Return an empty array if the field doesn't exist or isn't an array
            }
        } else {
            // Document does not exist
            console.log(`No document found for user '${user.uid}'.`);
            return null;
        }
        // @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('Error reading favorites:', error.message);
        throw error; // Re-throw to allow calling code to handle it
    }
};
