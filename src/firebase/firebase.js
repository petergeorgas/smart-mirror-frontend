// Import the functions you need from the SDKs you need
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCxfhvJxzIYOgYdBwAX-rg5706mvTEzCuk",

	authDomain: "smart-mirror-5b07a.firebaseapp.com",

	projectId: "smart-mirror-5b07a",

	storageBucket: "smart-mirror-5b07a.appspot.com",

	messagingSenderId: "25461489481",

	appId: "1:25461489481:web:5e26b26b154b75bd3a6498",
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const firestore = getFirestore(app);

const signInWithGoogle = () => {
	return signInWithPopup(auth, googleProvider);
};

const createSettingsForUser = async (userId) => {
	try {
		await addDoc(collection(firestore, "settings_page"), {
			// defaulting your settings values
			userId,
			workout: false,
			clock: true,
			sports: true
		});
	} catch(e) {
		return false
	}

	return true;
}

const getSettingsByUserId = async (userId) => {
	const q = query(collection(firestore, "settings_page"), where("userId", "==", userId));

	const querySnapshot = await getDocs(q);
	if (querySnapshot.docs.length > 0) {
		return querySnapshot.docs[0].data();
	} else {
		return null;
	}
};

export { signInWithGoogle, getSettingsByUserId, createSettingsForUser, firestore, auth };
