import { oauth2Client } from "../../../src/oath/oath2";

export default async function handler(req, res) {
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
		access_type: "offline",

		// If you only need one scope you can pass it as a string
		scope: scopes,
		resave: false,
		saveUninitialized: true,
	});

	res.json({
		url: url,
	});
}
