import React, { useEffect, useState, useRef } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { gapi } from "gapi-script";

import {
    ChakraProvider,
    Center,
    Heading,
    Spacer,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    StackDivider,
    HStack
} from '@chakra-ui/react';


function Calendar() {
    /*
    const [events, setEvents] = useState([]);

    const calendarID = process.env.REACT_APP_CALENDAR_ID;
    const apiKey = process.env.GOOGLE_OAUTH2_CLIENT_SECRET;
    const accessToken = process.env.GOOGLE_OAUTH2_CLIENT_ID;

    const getEvents = (calendarID, apiKey) => {
        function initiate() {
            gapi.client
                .init({
                    apiKey: apiKey,
                })
                .then(function () {
                    return gapi.client.request({
                        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                    });
                })
                .then(
                    (response) => {
                        let events = response.result.items;
                        setEvents(events);
                    },
                    function (err) {
                        return [false, err];
                    }
                );
        }
        gapi.load("client", initiate);
    };

    useEffect(() => {
        const events = getEvents(calendarID, apiKey);
        setEvents(events);
    }, []);

    return (
        <div className="App py-8 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4">
                React App with Google Calendar API!
                <ul>
                    {events?.map((event) => (
                        <li key={event.id} className="flex justify-center">
                            <Event description={event.summary} />
                        </li>
                    ))}
                </ul>
            </h1>
        </div>
    );
    
            <div bg="gray" h="100vh">
            <Box
                as="iframe"
                title="Work Route"
                border="2px"
                borderColor="gray.300"
                borderRadius="md"
                bg="gray.600"
                color="white"
                w="800px"
                h="400px"
                padding="10"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen=""
                    src="https://calendar.google.com/calendar/embed?src=chopaz101%40gmail.com&ctz=America%2FNew_York"

            >
            </Box>
        //</div>
     */

    var gapi = window.gapi
    /* 
      Update with your own Client Id and Api key 
    */
    var CLIENT_ID = "466562971638-fuaijn77ht334tv2i1n3nauu53jbknnj.apps.googleusercontent.com"
    var API_KEY = "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"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const handleClick = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {

                    var event = {
                        'summary': 'Awesome Event!',
                        'location': '800 Howard St., San Francisco, CA 94103',
                        'description': 'Really great refreshments',
                        'start': {
                            'dateTime': '2020-06-28T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'end': {
                            'dateTime': '2020-06-28T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=2'
                        ],
                        'attendees': [
                            { 'email': 'lpage@example.com' },
                            { 'email': 'sbrin@example.com' }
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event,
                    })

                    request.execute(event => {
                        console.log(event)
                        window.open(event.htmlLink)
                    })


                    /*
                        Uncomment the following block to get events
                    */

                    // get events
                    gapi.client.calendar.events.list({
                        'calendarId': 'primary',
                        'timeMin': (new Date()).toISOString(),
                        'showDeleted': false,
                        'singleEvents': true,
                        'maxResults': 10,
                        'orderBy': 'startTime'
                    }).then(response => {
                        const events = response.result.items
                        console.log('EVENTS: ', events)
                    })



                })
        })
    }


    return (
        <div className="App">
            <header className="App-header">
                <p>Click to add event to Google Calendar</p>
                <p style={{ fontSize: 18 }}>Uncomment the get events code to get events</p>
                <p style={{ fontSize: 18 }}>Don't forget to add your Client Id and Api key</p>
                <button style={{ width: 100, height: 50 }} onClick={handleClick}>Add Event</button>
            </header>
        </div>
    );

}

export default Calendar;