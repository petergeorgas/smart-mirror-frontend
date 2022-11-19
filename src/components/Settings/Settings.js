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
			setState();
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
					<Heading marginBottom="5">Settings</Heading>
					<Spacer />
					<Name uid={user.uid} name={name} setName={setName} />
					<VStack>
						<Checkbox defaultChecked>Be Very cool</Checkbox>
						<Checkbox defaultChecked>Don't smell.</Checkbox>
					</VStack>
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
			</Box>
		</Center>
	);
}

export default Settings;
