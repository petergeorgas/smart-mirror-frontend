import {
	Box,
	Button,
	Center,
	Fade,
	Heading,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import useWebSocket, { ReadyState } from "react-use-websocket";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function Hello(props) {
	const [currentName, setCurrentName] = useState(undefined);

	const router = useRouter();

	const { name, uid } = router.query;

	useEffect(() => {
		// TODO: Check if RESET, FITNESS MODE, ETC...
		if (name && uid) {
			setCurrentName(name);
			setTimeout(() => {
				setCurrentName(undefined);

				// Nested self timeouts are so fucked up
				setTimeout(() => {
					router.push(`/mirror/${uid}`);
				}, 400);
			}, 3000);
		}
	}, [name, router, uid]);

	return (
		<Center bg="black" h="100vh">
			<VStack>
				<Spacer />
				<AnimatePresence>
					{currentName && (
						<motion.div
							key={"my_unique_key"}
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<VStack>
								<Text
									color="white"
									fontWeight="bold"
									fontSize="8xl"
								>{`Hello, ${currentName}!`}</Text>
							</VStack>
						</motion.div>
					)}
				</AnimatePresence>
			</VStack>
		</Center>
	);
}
