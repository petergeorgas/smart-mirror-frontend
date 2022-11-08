import React, { useEffect, useState, useRef } from 'react';
import Moment from 'moment';
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



const options = {
	method: 'GET',
	url: 'https://nfl-schedule.p.rapidapi.com/v1/schedules',
	headers: {
		'X-RapidAPI-Key': '994b9686b6msh686468f028a70b5p126bb5jsn3e737efb88dd',
		'X-RapidAPI-Host': 'nfl-schedule.p.rapidapi.com'

	}
};


function Schedules() {



	const axios = require("axios");
	const moment = require("moment");



	const [AllInfo, setAllInfo] = React.useState(null);
	const [GameCounter, setGameCounter] = React.useState(0);
	const count = React.useRef(0);
	const length = React.useRef(0);

	useEffect(() => {

		axios.request(options).then(function (response) {

			if (response != null) {
				setAllInfo(response.data);
				console.log(AllInfo);

			}
		}).catch(function (error) {
			console.error(error);


		});
	}, []);


	useEffect(() => {
		if (AllInfo != null) {
			const interval = setInterval(() => {
				console.log(AllInfo);
				setGameCounter(count.current);
				count.current = count.current + 1;
				console.log(count);
				if (count.current >= AllInfo.data.length) {
					count.current = 0;
				}


			}, 2000);

		}
	}, []);


	return (
		<Center bg="gray" h="100vh">
			<Box
				border="2px"
				borderColor="gray.300"
				borderRadius="md"
				bg="gray.600"
				color="white"
				w="800px"
				h="400px"
				padding="10"
			>
				<VStack

					spacing={6}
					align='stretch'
				>

					<Box h='80px' bg='gray.600'>
						<Center> <Text fontSize='3xl'> {AllInfo && AllInfo.data[GameCounter].name} </Text> </Center>
					</Box>

					<Center>
						<HStack spacing='400px'>
							<Box w='100px' h='100px'>
								<Center> <Text fontSize='3xl'> {AllInfo && AllInfo.data[GameCounter].awayTeam.name} </Text> </Center>
								<Spacer />
								<Center> <Text fontSize='4xl'> {AllInfo && AllInfo.data[GameCounter].awayTeam.score} </Text> </Center>
							</Box>
							<Box w='100px' h='100px' bg='gray.600'>
								<Center> <Text fontSize='3xl'> {AllInfo && AllInfo.data[GameCounter].homeTeam.name} </Text> </Center>
								<Spacer />
								<Center> <Text fontSize='4xl'> {AllInfo && AllInfo.data[GameCounter].homeTeam.score} </Text> </Center>
							</Box>
						</HStack>
					</Center>


					<Spacer />

					<Box h='80px' bg='gray.600'>
						<Center> {AllInfo && moment(AllInfo.data[GameCounter].date).format('dddd, MMMM Do, h:mm a')}  </Center>
					</Box>

				</VStack>

			</Box>
		</Center>

	);

}

export default Schedules;