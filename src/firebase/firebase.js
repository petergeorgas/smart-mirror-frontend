// Import the functions you need from the SDKs you need
import {
	collection,
	query,
	where,
	getDocs,
	getDoc,
	addDoc,
	doc,
	setDoc,
	updateDoc,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const googleProvider = new GoogleAuthProvider()
	.addScope("https://www.googleapis.com/auth/calendar.events")
	.addScope("https://www.googleapis.com/auth/calendar.readonly")
	.addScope("https://www.googleapis.com/auth/userinfo.email")
	.addScope("https://www.googleapis.com/auth/userinfo.profile");

const auth = getAuth(app);

const firestore = getFirestore(app);

const storage = getStorage(app);

const signInWithGoogle = () => {
	return signInWithPopup(auth, googleProvider);
};

const createSettingsForUser = async (userId) => {
	try {
		await updateDoc(collection(firestore, "settings_page"), {
			// defaulting your settings values
			userId,
			workout: false,
			clock: true,
			sports: true,
			startLocation: '',
			endLocation: '',
			workoutMode: false,
		});
	} catch (e) {
		return false;
	}

	return true;
};

const addCalendarEvents = async (userId, calendarInfo) => {
	const docRef = doc(firestore, "users", userId);

	return updateDoc(docRef, { calendarInfo });
};

const addPhotoLink = async (userId, photoLink) => {
	const docRef = doc(firestore, "users", userId);

	return updateDoc(docRef, { photoUrl: photoLink });
};

const updateName = async (userId, userName) => {
	const docRef = doc(firestore, "users", userId);

	return updateDoc(docRef, { name: userName });
};

const getCalendarInfo = async (userId) => {
	const usersRef = doc(firestore, "users", userId);

	const snapshot = await getDoc(usersRef);

	if (snapshot.exists()) {
		return snapshot.data();
	}

	console.log("SNAPSHOT DOESN'T EXIST!");
	return null;
};

const createUserIfNotExists = async (userId) => {
	const usersRef = doc(firestore, "users", userId);

	const snapshot = await getDoc(usersRef);

	if (snapshot.exists()) {
		return;
	} else {
		return setDoc(doc(firestore, "users", userId), {});
	}
};

const getUser = async (userId) => {
	const usersRef = doc(firestore, "users", userId);

	const snapshot = await getDoc(usersRef);

	if (snapshot.exists()) {
		return snapshot.data();
	}

	console.log("SNAPSHOT DOESN'T EXIST!");
	return null;
};

const getSettingsByUserId = async (userId) => {
	const q = query(
		collection(firestore, "settings_page"),
		where("userId", "==", userId)
	);

	const querySnapshot = await getDocs(q);
	if (querySnapshot.docs.length > 0) {
		return querySnapshot.docs[0].data();
	} else {
		return null;
	}
};

const updateUserLayout = async (userId, layout) => {
	const docRef = doc(firestore, "users", userId);

	return updateDoc(docRef, { layout: layout });
}

const updateSettingsValueForUser = async (userId, settingsObject) => {
	const q = query(
		collection(firestore, "settings_page"),
		where("userId", "==", userId)
	);

	const querySnapshot = await getDocs(q);
	try {
		const result = await setDoc(querySnapshot.docs[0].ref, settingsObject, {
			merge: true,
		});
		console.log("result", result);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};
export {
	signInWithGoogle,
	getSettingsByUserId,
	createSettingsForUser,
	getCalendarInfo,
	getUser,
	createUserIfNotExists,
	addCalendarEvents,
	addPhotoLink,
	updateName,
	firestore,
	updateSettingsValueForUser,
	auth,
	storage,
	updateUserLayout
};
