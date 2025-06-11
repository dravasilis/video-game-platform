import { Auth, User } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc } from "firebase/firestore";
import { AppUser } from "../models/user";

export const setFavorite = async (auth: Auth, gameId: number, type: 'remove' | 'add') => {
    if (!auth.currentUser?.uid) return;
    const db = getFirestore();
    const userRef = doc(db, 'users', auth.currentUser.uid);
    try {
        type === 'add' ?
            await setDoc(userRef, {
                favorites: arrayUnion(gameId)
            }, { merge: true })
            :
            await updateDoc(userRef, {
                favorites: arrayRemove(gameId)
            });
        console.log(`Game '${gameId}' successfully added to user '${auth.currentUser.uid}' favorites.`);
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
                console.log(`Favorites for user '${user.uid}':`, userData.favorites);
                return userData.favorites;
            } else {
                console.log(`User '${user.uid}' document exists but has no 'favorites' array.`);
                return []; // Return an empty array if the field doesn't exist or isn't an array
            }
        } else {
            // Document does not exist
            console.log(`No document found for user '${user.uid}'.`);
            return null;
        }
    } catch (error: any) {
        console.log('Error reading favorites:', error.message);
        throw error; // Re-throw to allow calling code to handle it
    }
};
