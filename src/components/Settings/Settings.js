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

function Settings({ user }) {
    const [settings, setSettings] = useState({});
    const [showSettings, setShowSettings] = useState(false)
    const router = useRouter();
  
    useEffect(() => {
        const getSettings = async () => {
            const settings = await getSettingsByUserId(user.uid)
            // console.log(settings)
            setSettings(settings[0])
        }
        if (!user) {
            router.push('/Login')
        } else {
            setShowSettings(true)
        }
    }, []);

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
        </Box>
      </Center>
    );
  }

  export default Settings;