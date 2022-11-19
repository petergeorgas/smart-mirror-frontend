import React, { useEffect, useState } from "react";

import { auth, getCalendarInfo } from "../../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider } from "firebase/auth";

function Calendar() {
	const [user, loading, error] = useAuthState(auth);

	const [calInfo, setCalInfo] = useState(undefined);

	useEffect(() => {
		if (user) {
			getCalendarInfo(user.uid).then((userData) => {
				if (userData.calendarInfo) {
					console.log(userData.calendarInfo.items);
					setCalInfo(userData.calendarInfo.items);
				}
			});
		}
	}, [user]);

	return (
		<div className="App pt-4">
			<h1 className="text-2xl font-bold mb-4">
				React App with Google Calendar API!
			</h1>
		</div>
	);
}

export default Calendar;
