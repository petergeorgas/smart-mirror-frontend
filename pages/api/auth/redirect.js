import { google } from "googleapis";
import { firestore } from "../../../src/firebase/firebase";
import { doc, setDoc } from "firebase/firestore/lite";

import Cors from "cors";
import { oauth2Client } from "../../../src/oath/oath2";
// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
	methods: ["POST", "GET", "HEAD"],
	origin: "*",
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export default async function handler(req, res) {
	// Run the middleware
	await runMiddleware(req, res, cors);
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
