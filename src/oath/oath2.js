import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
	`${process.env.GOOGLE_OAUTH2_CLIENT_ID}`,
	`${process.env.GOOGLE_OAUTH2_CLIENT_SECRET}`,
	`${process.env.GOOGLE_OAUTH2_CLIENT_REDIRECT_URL}`
);

export { oauth2Client };
