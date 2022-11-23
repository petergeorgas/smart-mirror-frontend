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
	FormLabel
} from "@chakra-ui/react";
import Clock from "../Clock/Clock";
import News from "../News/News";
import {
	auth,
	createUserIfNotExists,
	updateSettingsValueForUser,
	getSettingsByUserId,
} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import FaceUpload from "../FaceUpload/FaceUpload";
import Name from "../Name/Name";

function Settings() {
	const [showSettings, setShowSettings] = useState(false);
	const [clockSetting, setClockSetting] = useState(false);
	const [sportsSetting, setSportsSetting] = useState(false);
	const [name, setName] = useState(undefined);
	const [startLocation, setStartLocation] = useState();
	const [endLocation, setEndLocation] = useState();
	const [workoutMode, setWorkoutMode] = useState();
	const [catImageSetting, setCatImageSetting] = useState(false);
	const router = useRouter();

	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (!loading && !error && user) {
			createUserIfNotExists(user.uid)
				.then(() => {
					return getSettingsByUserId(user.uid);
				})
				.then((settings) => {
					setShowSettings(true);
					setClockSetting(settings.clock);
					setSportsSetting(settings.sports);
					setCatImageSetting(settings.catImage);
					setStartLocation(settings.startLocation);
					setEndLocation(settings.endLocation);
					setWorkoutMode(settings.workoutMode);
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

	const updateSettingsState = async (settingsObject, setState) => {
		const success = await updateSettingsValueForUser(user.uid, settingsObject);
		console.log("success", success);
		if (success) {
			if (setState) {
				setState();
			}
		} else {
			alert("It broke!");
		}
	};

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
					<Heading as='h1' size='3xl'>Settings</Heading>
					<Spacer />

				</VStack>
				<Spacer />
				<VStack>
					<Heading as='h2' size='1xl'>Your Name</Heading>
					<Spacer />
					{/* needs to be the end location need to make prop for location */}
					<Name uid={user.uid} name={name} setName={setName} />
				</VStack>

				<Spacer />
				<VStack>
					{/* needs to be the start location need to make prop for location */}
					<Heading as='h2' size='1xl'>Start Location</Heading>
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
						<Button colorScheme="blue" onClick={() => {
							updateSettingsState({
								startLocation
							})
						}}>
							Change
						</Button>
					</HStack>
					<Heading as='h2' size='1xl'>End Location</Heading>
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
						<Button colorScheme="blue" onClick={() => {
							updateSettingsState({
								endLocation
							})
						}}>
							Change
						</Button>
					</HStack>
				</VStack>

				<VStack>
					<Checkbox
						isChecked={clockSetting}
						onChange={(e) => {
							updateSettingsState(
								{
									clock: e.target.checked,
								},
								setClockSetting.bind(this, e.target.checked)
							);
						}}
					>
						Clock
					</Checkbox>
					<Checkbox
						isChecked={sportsSetting}
						onChange={(e) => {
							updateSettingsState(
								{
									sports: e.target.checked,
								},
								setSportsSetting.bind(this, e.target.checked)
							);
						}}
					>
						Sports News
					</Checkbox>
					<Checkbox
						isChecked={catImageSetting}
						onChange={(e) => {
							updateSettingsState(
								{
									catImage: e.target.checked,
								},
								setCatImageSetting.bind(this, e.target.checked)
							);
						}}
					>
						Cat Image
					</Checkbox>
				</VStack>
				<FaceUpload uid={user.uid} name={name} setName={setName} />
				<Spacer />
				<br />
				<Flex align='center' >
					<FormLabel htmlFor='isChecked'>Workout Mode:</FormLabel>
					<Switch size='lg' isChecked={workoutMode} onChange={(e) => {
						updateSettingsState(
							{
								workoutMode: e.target.checked,
							},
							setWorkoutMode.bind(this, e.target.checked)
						);
					}} />
				</Flex>
			</Box>
		</Center>
	);
}

export default Settings;
