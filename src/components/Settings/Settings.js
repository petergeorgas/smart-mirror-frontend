import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Center,
	Box,
	VStack,
	HStack,
	Input,
	Button,
	Heading,
	Flex,
	Spacer,
	Checkbox,
	Switch,
	FormControl,
	SimpleGrid,
	FormLabel,
	Select,
} from "@chakra-ui/react";
import {
	auth,
	createUserIfNotExists,
	updateSettingsValueForUser,
	getSettingsByUserId,
} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import FaceUpload from "./FaceUpload";
import Name from "./Name";
import GridSettings from "./GridSettings";

function Settings() {
	const [showSettings, setShowSettings] = useState(false);
	const [name, setName] = useState(undefined);
	const [startLocation, setStartLocation] = useState();
	const [endLocation, setEndLocation] = useState();
	const [workoutMode, setWorkoutMode] = useState(false);
	const [workoutType, setWorkoutType] = useState("");
	const router = useRouter();
	const [isShown, setIsShown] = useState(false);

	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		console.log(user);
		if (!loading && !error && user) {
			createUserIfNotExists(user.uid)
				.then(() => {
					return getSettingsByUserId(user.uid);
				})
				.then((settings) => {
					setShowSettings(true);
					setStartLocation(settings.startLocation);
					setEndLocation(settings.endLocation);
					setWorkoutMode(settings.workoutMode);
					//setWorkoutType(settings.workoutType);
					setShowSettings(true);
				});
		} else if (!loading && !error && !user) {
			router.push("/Login");
		}
	}, [user, loading, error, router]);

	if (!showSettings) {
		return <div></div>;
	}

	// get settings object

	const updateSettingsState = async (settingsObject) => {
		const success = await updateSettingsValueForUser(user.uid, settingsObject);
		console.log("success", success);
		if (success) {
			return success;
		} else {
			alert("It broke!");
		}
	};

	const onStopWorkoutClick = () => {
		if (workoutMode) {
			fetch("http://localhost:8080/face", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: "resetworkout",
					id: "resetworkout",
				}),
			})
				.then((resp) => resp.json())
				.then((json) => {
					console.log(json);
					if (json.success) {
						updateSettingsState({
							workoutMode: false,
							workoutType: "",
						});
						setWorkoutMode(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const onStartWorkoutClick = () => {
		if (workoutType) {
			console.log(workoutType);
			fetch("http://localhost:8080/face", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: `${workoutType}/${user.uid}`,
					id: workoutType,
				}),
			})
				.then((resp) => resp.json())
				.then((json) => {
					console.log(json);
					if (json.success) {
						updateSettingsState({
							workoutMode: true,
							workoutType,
						});
						setWorkoutMode(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const onEditGrid = () => {
		setIsShown((current) => !current);
	};

	console.log(workoutMode);
	return (
		<Center bg="white" h="100vh">
			<Box
				border="2px"
				borderColor="gray.300"
				borderRadius="md"
				color="black"
				w="500px"
				padding="10"
			>
				<VStack>
					<Heading as="h1" size="3xl">
						Settings
					</Heading>
					<Spacer />
					{!isShown && (
						<Button colorScheme="blue" onClick={onEditGrid}>
							Edit Grid
						</Button>
					)}
					{isShown && (
						<Button colorScheme="blue" onClick={onEditGrid}>
							Back
						</Button>
					)}
				</VStack>
				<br />
				{isShown && <GridSettings uid={user.uid} />}
				{!isShown && (
					<VStack>
						<Heading as="h2" size="1xl">
							Your Name
						</Heading>
						<Spacer />
						{/* needs to be the end location need to make prop for location */}
						<Name uid={user.uid} name={name} setName={setName} />
						{/* needs to be the start location need to make prop for location */}
						<Heading as="h2" size="1xl">
							Start Location
						</Heading>
						<HStack>
							<Input
								border="2px"
								borderRadius="md"
								borderColor="gray.100"
								placeholder="Enter Address"
								value={startLocation}
								onChange={(e) => setStartLocation(e.target.value)}
							/>
							<Spacer />
							<Button
								colorScheme="blue"
								onClick={() => {
									updateSettingsState({
										startLocation,
									});
								}}
							>
								Change
							</Button>
						</HStack>
						<Heading as="h2" size="1xl">
							End Location
						</Heading>
						<HStack>
							<Input
								border="2px"
								borderRadius="md"
								borderColor="gray.100"
								placeholder="Enter Address"
								value={endLocation}
								onChange={(e) => setEndLocation(e.target.value)}
							/>
							<Spacer />
							<Button
								colorScheme="blue"
								onClick={() => {
									updateSettingsState({
										endLocation,
									});
								}}
							>
								Change
							</Button>
						</HStack>

						<br />
						<FaceUpload uid={user.uid} name={name} setName={setName} />
						<FormControl
							display="flex"
							alignItems="center"
							justifyContent="center"
							w="100%"
						>
							{!workoutMode ? (
								<>
									<Select
										placeholder="Select Workout"
										value={workoutType}
										onChange={(e) => {
											setWorkoutType(e.target.value);
										}}
									>
										<option value="coreworkout">Core Workout</option>
										<option value="yogaworkout">Yoga</option>
										<option value="generalworkout">General</option>
									</Select>
									<Button
										disabled={!workoutType || workoutMode}
										onClick={onStartWorkoutClick}
										colorScheme="blue"
									>
										Start
									</Button>{" "}
								</>
							) : (
								<Button
									disabled={!workoutMode}
									onClick={onStopWorkoutClick}
									colorScheme="red"
								>
									Stop Workout
								</Button>
							)}
						</FormControl>

						<FormControl display="flex" alignItems="center">
							<FormLabel htmlFor="email-alerts" mb="0">
								Workout Mode
							</FormLabel>
							<Switch
								id="email-alerts"
								isChecked={workoutMode}
								onChange={(e) => {
									setWorkoutMode(e.target.checked);
									updateSettingsState({
										workoutMode: e.target.checked,
									});
								}}
							/>
						</FormControl>
						{workoutMode && (
							<FormControl display="flex" alignItems="center">
								<FormLabel htmlFor="email-alerts" mb="0">
									Workout Type
								</FormLabel>
								<Select
									placeholder="Select Workout"
									value={workoutType}
									onChange={(e) => {
										setWorkoutType(e.target.value);
										updateSettingsState({
											workoutType: e.target.value,
										});
									}}
								>
									<option value="core">Core Workout</option>
									<option value="yoga">Yoga</option>
									<option value="general">General</option>
								</Select>
							</FormControl>
						)}
					</VStack>
				)}
			</Box>
		</Center>
	);
}

export default Settings;
