import {
  Box,
  Button,
  Center,
  Heading,
  Spacer,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "../../firebase/firebase";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Clock(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 60 * 1000);
  }, []);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <Box>
      <Box display="flex" flexDirection="row" alignItems="baseline">
        <Text w="265px" fontWeight="bold" fontSize="8xl">{`${
          hours > 12 ? hours - 12 : hours
        }:${minutes}`}</Text>

        <Text fontSize="5xl">{hours >= 12 ? "pm" : "am"}</Text>
      </Box>
      <Text fontSize="3xl">{`${days[date.getDay()]}, ${
        months[date.getMonth() - 1]
      } ${date.getDate()}, ${date.getFullYear()}
      `}</Text>
    </Box>
  );
}

export default Clock;
