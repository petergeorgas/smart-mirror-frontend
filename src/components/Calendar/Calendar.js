import React, { useEffect, useState, useRef } from "react";

import { auth, getCalendarInfo } from "../../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Moment from 'moment';
import {
	Center,
	Box,
	Text,
	VStack,
	HStack,
	List,
	ListItem,
	Grid,
	GridItem

} from '@chakra-ui/react';

function Calendar() {
	const moment = require("moment");

	var i = 0;
	var count = 1;

	const [user, loading, error] = useAuthState(auth);

	const [calInfo, setCalInfo] = useState(undefined);

	var list = [];

	var events = [];
	events.push("Name");
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
		startdate[k] = moment(list[k-1].start).format('ddd, MMM D, h:mm a');
		enddate[k] = moment(list[k-1].end).format('ddd, MMM D, h:mm a');
		if (k == 4) {
			events.length = 5;
			startdate.length = 5;
			enddate.length = 5;
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
		<Box w='100%' h='100%' padding = '2%'>
			<VStack>
			<Box h='5%' fontSize={"2xl"} fontWeight="bold" textAlign="center">
			Upcoming Events
			</Box>

			<Grid h='100%' templateColumns='repeat(7, 1fr)' gap={4}>

				<GridItem colSpan={1}>
				{events.map((events) => (
					<Box w='100%' h='25%' fontWeight="bold" fontSize={"2xl"} key={events} textAlign="center"><Center>{events}</Center></Box>
				))}

			</GridItem>
			<GridItem colSpan={3}>
						{startdate.map((startdate) => (
							<Box w='100%' h='25%' fontWeight="bold" fontSize={"2xl"} key={startdate} textAlign = "center"><Center>{startdate}</Center></Box>
					))}
			</GridItem>
			<GridItem colSpan={3}>
				{enddate.map((enddate) => (
					<Box w='100%' h='25%' fontWeight="bold" fontSize={"2xl"} key={enddate} textAlign="center"><Center>{enddate}</Center></Box>
				))}
			</GridItem>

			</Grid>
			</VStack>
			</Box>
	);
}

export default Calendar;
