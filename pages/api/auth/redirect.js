import { google } from "googleapis";
import { firestore } from "../../../src/firebase/firebase";
import { doc, setDoc } from "firebase/firestore/lite";

import { oauth2Client } from "../../../src/oath/oath2";

export default async function handler(req, res) {
	// Run the middleware
	const code = req.query.code;

	if (code) {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);

		let oauth2 = google.oauth2({
			auth: oauth2Client,
			version: "v2",
		});

		let { data } = await oauth2.userinfo.get();
		let userInfo = data;
		const calendar = google.calendar({
			version: "v3",
			auth: oauth2Client,
		});

		try {
			const today = new Date();
			const maxDate = new Date();
			maxDate.setDate(today.getDate() + 7);
			const response = await calendar.events.list({
				calendarId: "primary",
				timeMin: today.toISOString(),
				timeMax: maxDate.toISOString(),
				maxResults: 30,
				singleEvents: true,
				orderBy: "startTime",
			});
			const events = response.data.items ?? [];
			userInfo["calendarEvents"] = events;
			await setDoc(doc(firestore, "users", data.id), userInfo);
			console.log("successfully updated firebase!!!");
		} catch (e) {
			console.log(e);
			res.status(400).json({ error: e.message });
		}
		return res.redirect("http://localhost:3000/settings");
	}

	res.end();
}
