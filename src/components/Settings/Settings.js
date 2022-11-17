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
import { getSettingsByUserId, updateSettingsValueForUser } from "../../firebase/firebase";
import Clock from "../Clock/Clock";
import News from "../News/News";

let timeout;  // Not a great solution using global variable try doing this with useState

function Settings({ user }) {
    const [showSettings, setShowSettings] = useState(false)
    const [clockSetting, setClockSetting] = useState(false);
    const [sportsSetting, setSportsSetting] = useState(false);
    const [catImageSetting, setCatImageSetting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        clearTimeout(timeout);
        const getSettings = async () => {
          console.log("user.uid", user.uid)
          const settings = await getSettingsByUserId(user.uid)
          console.log(settings.clock, settings.sports);
          setClockSetting(settings.clock)
          setSportsSetting(settings.sports)
          setCatImageSetting(settings.catImage)
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

    const updateSettingsState = async (settingsObject, setState) => {
      const success = await updateSettingsValueForUser(user.uid, settingsObject);
      console.log("success", success)
      if (success) {
        setState()
      } else {
        alert("It broke!")
      }
    }
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
              <Checkbox isChecked={clockSetting} onChange={ (e) => {
                updateSettingsState({
                  clock: e.target.checked
                }, setClockSetting.bind(this, e.target.checked))
              }}>Clock</Checkbox>
              <Checkbox isChecked={sportsSetting} onChange={(e) => {
                updateSettingsState({
                  sports: e.target.checked
                }, setSportsSetting.bind(this, e.target.checked))
              }}>Sports News</Checkbox>
              <Checkbox isChecked={catImageSetting} onChange={(e) => {
                updateSettingsState({
                  catImage: e.target.checked
                }, setCatImageSetting.bind(this, e.target.checked))
              }}>Cat Image</Checkbox>
            </VStack>
          </VStack>
          <VStack>
          {/* {settings.clock && <Box>
            <Clock />
          </Box>}
          {settings.sports && <Box>
            <News />
          </Box>} */}
          {/* {settings.workout && <div>Workout Component</div>} */}
          </VStack>
        </Box>
      </Center>
    );
  }

  export default Settings;