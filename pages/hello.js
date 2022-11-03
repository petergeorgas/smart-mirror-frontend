import {
  Box,
  Button,
  Center,
  Fade,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import useWebSocket, { ReadyState } from "react-use-websocket";

import React, { useState, useEffect } from "react";
export default function Hello() {
  const [currentName, setCurrentName] = useState(undefined);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8080/face",
    {
      onOpen: () => {
        console.log("ws connection opened!");
      },
      onClose: () => {
        console.log("ws connection closed :(");
      },
      onError: () => {
        console.log("err occurred");
      },
      onMessage: (ev) => {
        console.log(ev);
        setTimeout(() => {
          setCurrentName(undefined);
        }, 3000);
      },
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN && lastMessage !== null) {
      setCurrentName(lastMessage.data);
    }
  }, [readyState, lastMessage]);

  return (
    <Center bg="black" h="100vh">
      <VStack>
        <Spacer />
        <AnimatePresence>
          {currentName && (
            <motion.div
              key={"my_unique_key"}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <VStack>
                <Text
                  color="white"
                  fontWeight="bold"
                  fontSize="8xl"
                >{`Hello, ${lastMessage.data}!`}</Text>
              </VStack>
            </motion.div>
          )}
        </AnimatePresence>
      </VStack>
    </Center>
  );
}
