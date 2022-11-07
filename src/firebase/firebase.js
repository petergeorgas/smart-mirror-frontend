// Import the functions you need from the SDKs you need
import { collection, query, where, getDocs } from "firebase/firestore";

import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// web app's Firebase configuration
const firebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY}`,
	authDomain: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN}`,
	projectId: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJ_ID}`,
	storageBucket: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
	appId: `${process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const firestore = getFirestore(app);

const signInWithGoogle = () => {
	return signInWithPopup(auth, googleProvider)

};

const getSettingsByUserId = async (userId) => {
	const q = query(collection(db, "settings"), where("userId", "==", userId));

	const querySnapshot = await getDocs(q);
	return querySnapshot
}

export { signInWithGoogle, getSettingsByUserId, firestore, auth };

