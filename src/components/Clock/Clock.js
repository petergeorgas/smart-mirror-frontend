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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" flexDirection="row" alignItems="baseline">
        <Text fontSize="8xl" fontWeight="bold">{`${
          hours > 12 ? hours - 12 : hours
        }:${minutes < 10 ? `0${minutes}` : minutes}`}</Text>

        <Text>{hours >= 12 ? "pm" : "am"}</Text>
      </Box>
      <Text fontSize="xl">{`${days[date.getDay()]}, ${
        months[date.getMonth() - 1]
      } ${date.getDate()}, ${date.getFullYear()}
      `}</Text>
    </Box>
  );
}

export default Clock;
