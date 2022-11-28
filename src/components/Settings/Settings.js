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
import GridSettings from "./GridSettings"

function Settings() {
  const [showSettings, setShowSettings] = useState(false);
  const [name, setName] = useState(undefined);
  const [startLocation, setStartLocation] = useState();
  const [endLocation, setEndLocation] = useState();
  const [workoutMode, setWorkoutMode] = useState();
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
	console.log(user)
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

  const onEditGrid = () => {
		setIsShown(current => !current);
  }

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
        <br/>
		{isShown && (<GridSettings uid={user.uid} />)}
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
			<br/>
			<FaceUpload uid={user.uid} name={name} setName={setName} />
		  </VStack>
		)}
      </Box>
    </Center>
  );
}

export default Settings;
