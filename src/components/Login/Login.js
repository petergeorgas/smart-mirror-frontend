import {
	Box,
	Button,
	Center,
	Heading,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import React from "react";
import { signInWithGoogle } from "../../firebase/firebase";

function Login() {
	const onSignInWithGoogleClick = async() => {
		const responce = await fetch("http://localhost:8000/getAuthURL", {
			mode: "cors"
		})
		const responceJson = await responce.json()
		window.location.assign(responceJson.url) 
		console.log(responceJson)
		console.log(responceJson.url)
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
