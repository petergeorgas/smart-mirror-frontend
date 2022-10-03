const path = require("path")
const {google} = require("googleapis")
const { GoogleAuth } = require("google-auth-library")

const express = require('express')
const app = express()
const port = 8000
app.get('/getAuthURL', async (req, res) =>
{
  const oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
  );
  
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
  ];
  
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: scopes
  });
})
app.get('/', async (req, res) => {
  const credentialspath = path.join(process.cwd(), "credentials.json")
    const auth = new google.auth.GoogleAuth({
        keyFile: credentialspath, 
        scopes: [
                  'https://www.googleapis.com/auth/calendar',
                  'https://www.googleapis.com/auth/calendar.events',
                  'https://www.googleapis.com/auth/calendar.events.readonly',
                  'https://www.googleapis.com/auth/calendar.readonly',

                ]

    })
    const authclient = await auth.getClient()
    const calendar = await google.calendar({

        version: "v3", 
        auth: authclient
    })
    try{
        const date = new Date();
        const maxdate = new Date();
        maxdate.setDate(date.getDate()+7)  
        const responce = await calendar.events.list({
            calendarId: "primary",
            timeMin: date.toISOString(),
            timeMax: maxdate.toISOString(),
            maxResults: 30,
            singleEvents: true,
            orderBy: "startTime"
        })
        const events = responce.data.items ?? []
        res.status(200).json({events: events})
    }
    catch(e){
        console.log(e)
        res.status(400).json({error: e.message})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

