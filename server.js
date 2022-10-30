const session = require("express-session");
const cors = require("cors");
const { google } = require("googleapis");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore/lite");

const firebaseConfig = {
	apiKey: "AIzaSyCxfhvJxzIYOgYdBwAX-rg5706mvTEzCuk",

	authDomain: "smart-mirror-5b07a.firebaseapp.com",

	projectId: "smart-mirror-5b07a",

	storageBucket: "smart-mirror-5b07a.appspot.com",

	messagingSenderId: "25461489481",

	appId: "1:25461489481:web:5e26b26b154b75bd3a6498",
};

const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);

const express = require("express");
const app = express();
const port = 8000;

app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
app.use(cors());

app.get("/getAuthURL", async (req, res) => {
	const oauth2Client = new google.auth.OAuth2(
		"466562971638-fuaijn77ht334tv2i1n3nauu53jbknnj.apps.googleusercontent.com",
		"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",
		"http://localhost:8000/auth/redirect" //define later
	);

	// generate a url that asks permissions for Blogger and Google Calendar scopes
	const scopes = [
		"https://www.googleapis.com/auth/calendar",
		"https://www.googleapis.com/auth/calendar.events",
		"https://www.googleapis.com/auth/calendar.events.readonly",
		"https://www.googleapis.com/auth/calendar.readonly",
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
	];

	const url = oauth2Client.generateAuthUrl({
		// 'online' (default) or 'offline' (gets refresh_token)
		access_type: "online",

		// If you only need one scope you can pass it as a string
		scope: scopes,
		resave: false,
		saveUninitialized: true,
	});

	res.json({
		url: url,
	});
});
app.get("/auth/redirect", async (req, res, next) => {
	const code = req.query.code;
	if (code) {
		const oauth2Client = new google.auth.OAuth2(
			"466562971638-fuaijn77ht334tv2i1n3nauu53jbknnj.apps.googleusercontent.com",
			"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",
			"http://localhost:8000/auth/redirect"
		);

		//const {tokens} = await oauth2Client.getToken(code)
		const result = await oauth2Client.getToken(code);
		//console.log(result);

		oauth2Client.setCredentials(result.tokens);
		req.session.login = true;
		req.session.tokens = result.tokens;

		let oauth2 = google.oauth2({
			auth: oauth2Client,
			version: "v2",
		});
		const { data } = await oauth2.userinfo.get();
		req.session.googleUserInfo = data;

		let userInfo = data;

		const calendar = google.calendar({
			version: "v3",
			auth: oauth2Client,
		});

		try {
			const date = new Date();
			const maxdate = new Date();
			maxdate.setDate(date.getDate() + 7);

			const response = await calendar.events.list({
				calendarId: "primary",
				timeMin: date.toISOString(),
				timeMax: maxdate.toISOString(),
				maxResults: 30,
				singleEvents: true,
				orderBy: "startTime",
			});
			const events = response.data.items ?? [];

			userInfo["calendarEvents"] = events;

			await setDoc(doc(db, "users", data.id), userInfo);
			console.log("successfully updated firebase!!!");
		} catch (e) {
			console.log(e);
			res.status(400).json({ error: e.message });
		}
		return res.redirect("http://localhost:3000/settings");
	}
	res.end();
	//TODO: check if login key exits ****
});
app.get("/calendar", async (req, res) => {
	const oauth2Client = new google.auth.OAuth2(
		"466562971638-fuaijn77ht334tv2i1n3nauu53jbknnj.apps.googleusercontent.com",
		"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",
		"http://localhost:8000/auth/redirect"
	);
	const tokens = req.session.tokens;
	oauth2Client.setCredentials(tokens);
	// const authclient = await auth.getClient()
	const calendar = await google.calendar({
		version: "v3",
		auth: oauth2Client,
	});
	try {
		const date = new Date();
		const maxdate = new Date();
		maxdate.setDate(date.getDate() + 7);
		const response = await calendar.events.list({
			calendarId: "primary",
			timeMin: date.toISOString(),
			timeMax: maxdate.toISOString(),
			maxResults: 30,
			singleEvents: true,
			orderBy: "startTime",
		});
		const events = response.data.items ?? [];
		res.status(200).json({ events: events });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e.message });
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
