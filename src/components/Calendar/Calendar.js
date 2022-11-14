import React, { useEffect, useState } from "react";
import { gapi } from 'gapi-script';
import Event from "./Event.js";

function Calendar() {
    
    const calendarID = process.env.REACT_APP_CALENDAR_ID;
    const apiKey = process.env.GOOGLE_OAUTH2_CLIENT_ID;
    const accessToken = process.env.GOOGLE_OAUTH2_CLIENT_ID;


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
                    return events;
                },
                function (err) {
                    return [false, err];
                }
            );
    }

    gapi.load("client", initiate);



useEffect(() => {
    const events = getEvents(calendarID, apiKey);
    setEvents(events);
}, []);


return (
    <div className="App pt-4">
        <h1 className="text-2xl font-bold mb-4">
            React App with Google Calendar API!
        </h1>
    </div>
);
}

export default Calendar;