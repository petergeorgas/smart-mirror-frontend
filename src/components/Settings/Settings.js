import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Center,
	Box,
	VStack,
	Heading,
	Spacer,
	Checkbox,
} from "@chakra-ui/react";
import {
	auth,
	createUserIfNotExists,
	getSettingsByUserId,
} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import FaceUpload from "../FaceUpload/FaceUpload";
import Name from "../Name/Name";

let timeout; // Not a great solution using global variable try doing this with useState

function Settings() {
	const [settings, setSettings] = useState({});
	const [showSettings, setShowSettings] = useState(false);
	const [name, setName] = useState(undefined);
	const router = useRouter();

	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (!loading && !error && user) {
			createUserIfNotExists(user.uid)
				.then(() => {
					return getSettingsByUserId(user.uid);
				})
				.then((settings) => {
					setSettings(settings);
					setShowSettings(true);
				});
		} else if (!loading && !error && !user) {
			router.push("/Login");
		}
	}, [user, loading, error]);

	if (!showSettings) {
		return <div></div>;
	}

	// get settings object

	return (
		<Center bg="white" h="100vh">
			<Box
				border="2px"
				borderColor="gray.300"
				borderRadius="md"
				color="black"
				w="400px"
				padding="10"
			>
				<VStack>
					<Heading marginBottom="5">Settings</Heading>
					<Spacer />
					<Name uid={user.uid} name={name} setName={setName} />
					<VStack>
						<Checkbox defaultChecked>Be Very cool</Checkbox>
						<Checkbox defaultChecked>Don't smell.</Checkbox>
					</VStack>
				</VStack>
				<VStack>
					{settings.clock && (
						<Box>
							<div>Clock Component</div>
						</Box>
					)}
					{settings.sports && <div>Sports Component</div>}
					{settings.workout && <div>Workout Component</div>}
				</VStack>
				<FaceUpload uid={user.uid} name={name} setName={setName} />
			</Box>
		</Center>
	);
}

export default Settings;
