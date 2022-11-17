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
<<<<<<< HEAD
import WebSocket from "../../src/components/WebSocket/WebSocket";
export default function Hello(props) {
  return (
    <WebSocket>
      <Center bg="black" h="100vh"></Center>
    </WebSocket>
=======
import { useRouter } from "next/router";
export default function Hello(props) {
  const [currentName, setCurrentName] = useState(undefined);

  const router = useRouter();

<<<<<<< HEAD:pages/hello/[name].js
  const { name, uid } = router.query;
=======
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

          // Nested self timeouts are so fucked up
          setTimeout(() => {
            router.push(`/mirror/RQQo7YZKGeT1EHgZPP1mMg2twJh2`);
          }, 400);
        }, 3000);
      },
      shouldReconnect: (closeEvent) => true,
    }
  );
>>>>>>> ce37caeaae8835290ae564acf9d68462322c0d9d:pages/hello/index.js

  useEffect(() => {
    // TODO: Check if RESET, FITNESS MODE, ETC...
    if (name && uid) {
      setCurrentName(name);
      setTimeout(() => {
        setCurrentName(undefined);

        // Nested self timeouts are so fucked up
        setTimeout(() => {
          router.push(`/mirror/${uid}`);
        }, 400);
      }, 3000);
    }
  }, [name, router, uid]);

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
                >{`Hello, ${currentName}!`}</Text>
              </VStack>
            </motion.div>
          )}
        </AnimatePresence>
      </VStack>
    </Center>
>>>>>>> ce37caeaae8835290ae564acf9d68462322c0d9d
  );
}
