/* eslint-disable react-hooks/exhaustive-deps */
import { SimpleGrid, Box, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Clock from "../../src/components/Clock/Clock";
import Compliment from "../../src/components/Compliment/compliment";
import Calendar from "../../src/components/Calendar/Calendar";
import {
  firestore,
  getUser,
  snapshot,
  updateUserLayout,
} from "../../src/firebase/firebase";
import Map from "../../src/components/Map/Map";
import Schedules from "../../src/components/Schedules/Schedules";
import Cat from "../../src/components/CatImage/catimage";
import WebSocket from "../../src/components/WebSocket/WebSocket";
import Weather from "../../src/components/Weather/Weather";
import { doc, onSnapshot } from "firebase/firestore";

const componentMap = {
  clock: <Clock />,
  cat: <Cat />,
  compliment: <Compliment />,
  calendar: <Calendar />,
  map: <Map />,
  schedules: <Schedules />,
  weather: <Weather />,
};

export default function MirrorPage() {
  const router = useRouter();
  const { id } = router.query;

  const [boxes, setBoxes] = useState([
    "default",
    "edit",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);

  useEffect(() => {
    if (id) {
      getUser(id).then((user) => {
        console.log(user.layout);
        if (user.layout == null) {
          updateUserLayout(id, boxes);
        } else {
          setBoxes(user.layout);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const userRef = doc(firestore, "users", id);
      const snap = onSnapshot(userRef, (doc) => {
        console.log("snapshot detected!");
        console.log(doc.data().layout);
        setBoxes(doc.data().layout);
      });
      return snap;
    }
  }, [id, setBoxes]);

  const editPrompt = (
    <Center>
      <Text>Please go to "webaddress/Login" to edit your specific grid</Text>
    </Center>
  );

  const components = boxes.map((item, i) => {
    if (item === "default") {
      return <Box key={i} bg="black" h="476px"></Box>;
    } else {
      return (
        <Box
          key={i}
          bg="black"
          h="476px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {componentMap[item]}
        </Box>
      );
    }
  });

  return (
    <WebSocket>
      <SimpleGrid bg="black" columns={3} spacing={1} overflow="hidden">
        {components}
      </SimpleGrid>
    </WebSocket>
  );
}
