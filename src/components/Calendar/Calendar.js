import React, { useEffect, useState, useRef } from "react";

import { auth, getCalendarInfo } from "../../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Moment from 'moment';
import {
	Center,
	Spacer,
	Box,
	Text,
	VStack,
	HStack
} from '@chakra-ui/react';

function Calendar() {
	const moment = require("moment");

	var i = 0;
	var count = 1;

	const [user, loading, error] = useAuthState(auth);

	const [calInfo, setCalInfo] = useState(undefined);

	var list = [];

	var events = [];
	events.push("Upcoming Events");
	var startdate = [];
	startdate.push("Start");
	var enddate = [];
	enddate.push("End");

	var mcurrentdate =  moment(new Date());


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

		while (calInfo != undefined) {
			if (calInfo[i] == undefined) {
				break;
			}
			if (moment(mcurrentdate).isBefore(moment(calInfo[i].start.dateTime))) {

				events[count] = calInfo[i].summary;
				startdate[count] = calInfo[i].start.dateTime;
				enddate[count] = calInfo[i].end.dateTime;
				count++;
			}
			
			i++;
	}
	for (let j = 1; j < events.length; j++) {
		list.push({ 'event': events[j], 'start': startdate[j], 'end': enddate[j] });
    }


	list.sort(function (a, b) {
		return new Date(a.start) - new Date(b.start);
	})



	for (var k = 1; k < list.length+1; k++) {
		events[k] = list[k-1].event;
		startdate[k] = moment(list[k-1].start).format('dddd, MMMM Do, h:mm a');
		enddate[k] = moment(list[k-1].end).format('dddd, MMMM Do, h:mm a');
		if (k == 5) {
			break;
		}
	}

	


	if (events.length == 1) {
		return (
			<div className="App pt-4">
				No upcoming events!
			</div>
		);
	}
	i = 0;
	return (

		
		<div className="App pt-4">
		
			<HStack spacing='100px'>

			<VStack spacing='10px'>
			{events.map((events) => (
				<li key={events}>{events}</li>
			))}

				</VStack>
			<VStack spacing='10px'>
			{startdate.map((startdate) => (
				<li key={startdate}>{startdate}</li>
			))}

					</VStack>
				<VStack spacing='10px'>
					{enddate.map((enddate) => (
						<li key={enddate}>{enddate}</li>
					))}
					 
					</VStack>
			</HStack>
			
		</div>
		

	);
}

export default Calendar;
