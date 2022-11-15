import {
	Box,
	Button,
	Center,
	Heading,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import React from "react";
import {
	signInWithGoogle,
	getSettingsByUserId,
	createSettingsForUser,
	addCalendarEvents,
} from "../../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";

function Login() {
	const router = useRouter();
	const onSignInWithGoogleClick = async () => {
		try {
			const res = await signInWithGoogle();
			const credential = GoogleAuthProvider.credentialFromResult(res);

			fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
				headers: {
					Authorization: `Bearer ${credential.accessToken}`,
				},
			})
				.then((resp) => {
					return resp.json();
				})
				.then((json) => {
					return addCalendarEvents(res.user.uid, json);
				})
				.then(() => {
					console.log("Successfully added calendar events!!");
				});
			if (res.user) {
				const settings = await getSettingsByUserId(res.user.uid);
				const hasSettings = !!settings;
				if (!hasSettings) {
					const success = await createSettingsForUser(res.user.uid);
					console.log("success", true);
				}

				router.push("/settings");
			}
		} catch (e) {
			console.log(e);
		}
		// const response = await fetch(
		// 	"http://localhost:3000/api/auth/getAuthURL",
		// 	{}
		// );

		// const responceJson = await response.json();
		// console.log(responceJson.url);
		// window.location.assign(responceJson.url);
	};
	//check for redirect 10/13/2022
	return (
		<Center bg="white" h="100vh">
			<Box
				border="2px"
				borderColor="gray.300"
				borderRadius="md"
				bg="gray.50"
				color="black"
				w="400px"
				h="400px"
				padding="10"
			>
				<VStack>
					<Heading marginBottom="5">Smart Mirror</Heading>
					<Spacer />
					<VStack>
						<GoogleButton onclick={onSignInWithGoogleClick} />
						<GitHubButton />
					</VStack>
				</VStack>
			</Box>
		</Center>
	);
}

function GoogleButton(props) {
	const { onclick } = props;

	return (
		<Button
			onClick={onclick}
			bg="white"
			size="lg"
			w={"full"}
			variant="solid"
			maxW={"md"}
			border="1px"
			borderColor="gray.300"
			leftIcon={<FcGoogle />}
		>
			<Center>
				<Text>Sign in with Google</Text>
			</Center>
		</Button>
	);
}

function GitHubButton() {
	return (
		<Button
			bg="white"
			size="lg"
			w={"full"}
			variant="solid"
			maxW={"md"}
			border="1px"
			borderColor="gray.300"
			leftIcon={<FaGithub />}
		>
			<Center>
				<Text>Sign in with GitHub</Text>
			</Center>
		</Button>
	);
}

export default Login;
