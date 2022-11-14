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
import { getSettingsByUserId } from "../../firebase/firebase";

let timeout;  // Not a great solution using global variable try doing this with useState

function Settings({ user }) {
    const [settings, setSettings] = useState({});
    const [showSettings, setShowSettings] = useState(false)
    const router = useRouter();

    useEffect(() => {
        clearTimeout(timeout);
        const getSettings = async () => {
          console.log("user.uid", user.uid)
          const settings = await getSettingsByUserId(user.uid)
          console.log("settings", settings)
          setSettings(settings)
          setShowSettings(true)
        }
        console.log("settings page login", user)
        if (!user) {
          timeout = setTimeout(() => { 
            // debouncing redirect ...because firebase auth state change happens multiple timples after render
            router.push('/Login')
          }, 1000)
        } else {
            getSettings()
        }
    }, [user]);

    if (!showSettings) {
        return <div></div>
    }
    
    // get settings object 

    
    return (
      
      <Center bg="white" h="100vh">
        <Box
          border="2px"
          borderColor="gray.300"
          borderRadius="md"
          bg="gray.100"
          color="black"
          w="400px"
          h="400px"
          padding="10"
        >
          <VStack>
            <Heading marginBottom="5">Settings</Heading>
            <Spacer />
            <VStack>
              <Checkbox defaultChecked>Be Very cool</Checkbox>
              <Checkbox defaultChecked>Don't smell.</Checkbox>
            </VStack>
          </VStack>
          <VStack>
          {settings.clock && <Box>
            <div>Clock Component</div>
          </Box>}
          {settings.sports && <div>Sports Component</div>}
          {settings.workout && <div>Workout Component</div>}
          </VStack>
        </Box>
      </Center>
    );
  }

  export default Settings;