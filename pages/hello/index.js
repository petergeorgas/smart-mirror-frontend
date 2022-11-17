import { Center } from "@chakra-ui/react";
import React from "react";
import WebSocket from "../../src/components/WebSocket/WebSocket";

function index() {
  return (
    <WebSocket>
      <Center bg="black" h="100vh"></Center>
    </WebSocket>
  );
}

export default index;
