/* eslint-disable react-hooks/exhaustive-deps */
import { SimpleGrid, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cat from "../../src/components/CatImage/catimage";
import Clock from "../../src/components/Clock/Clock";
import { getUser } from "../../src/firebase/firebase";
import WebSocket from "../../src/components/WebSocket/WebSocket";
import Workout from "../../src/components/Workout/Workout";

export default function WorkoutPage() {
	const router = useRouter();
	const { workout } = router.query;

	if (workout) {
		return (
			<WebSocket>
				<Flex
					direction="row"
					w="100%"
					h="100vh"
					justifyContent="center"
					alignItems="center"
				>
					<Workout workoutType={workout} />
				</Flex>
			</WebSocket>
		);
	}
}
