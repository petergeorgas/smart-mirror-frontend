import path from "path"
import {google} from "googleapis"
import process from "process"
import { GoogleAuth } from "google-auth-library"

export default async function handler(req, res){

    const credentialspath = path.join(process.cwd(), "credentials.json")
    const auth = new google.auth.GoogleAuth({
        keyFile: credentialspath, 
        scopes: [
                    'https://www.googleapis.com/auth/calendar',
                    'https://www.googleapis.com/auth/calendar.events'
                ]

    })
    const authclient = await auth.getClient()
    const calendar = await google.calendar({

        version: "v3", 
        auth: authclient
    })
    try{
        const r = await calendar.events.insert({
            calendarId: 'primary',
            resource: {
                summary: 'Google I/O 2015',
                location: '800 Howard St., San Francisco, CA 94103',
                description: 'A chance to hear more about Google\'s developer products.',
                start: {
                    'dateTime': new Date().toISOString(),
                    'timeZone': 'America/Los_Angeles',
                },
                end: {
                    'dateTime': '2022-09-28T17:00:00-07:00',
                    'timeZone': 'America/Los_Angeles',
                },
            }
        
        })
        const responce = await calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
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
}


