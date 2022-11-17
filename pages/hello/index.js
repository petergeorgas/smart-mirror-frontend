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
import WebSocket from "../../src/components/WebSocket/WebSocket";
export default function Hello(props) {
  return (
    <WebSocket>
      <Center bg="black" h="100vh"></Center>
    </WebSocket>
  );
}
