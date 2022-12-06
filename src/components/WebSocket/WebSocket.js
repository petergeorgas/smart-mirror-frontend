import { useRouter } from "next/router";
import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WarningIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { Box, Portal } from "@chakra-ui/react";

function WebSocket(props) {
  const { children } = props;
  const router = useRouter();
  const [connIssue, setConnIssue] = useState(false);

  const ref = useRef();

  // TODO: Remove this?
  const { lastJsonMessage, readyState } = useWebSocket(
    `ws://${process.env.NEXT_PUBLIC_API_URL}:8080/face`,
    {
      onOpen: () => {
        console.log("ws connection opened!");
        setConnIssue(false);
      },
      onClose: () => {
        console.log("ws connection closed :(");
        setConnIssue(true);
      },
      onError: () => {
        console.log("err occurred");
        setConnIssue(true);
      },
      onMessage: (ev) => {
        console.log(ev);

        const messageData = JSON.parse(ev.data);
        console.log(messageData);

        const splitName = messageData?.name.split("/");

        if (
          (messageData.name === "reset" && messageData.id === "reset") ||
          messageData.id == "resetworkout"
        ) {
          router.push("/hello");
        } else if (
          splitName.length === 2 &&
          ((splitName[0] === "coreworkout" &&
            messageData.id === "coreworkout") ||
            (splitName[0] === "yogaworkout" &&
              messageData.id === "yogaworkout") ||
            (splitName[0] === "generalworkout" &&
              messageData.id === "generalworkout"))
        ) {
          router.push(`/workout/${splitName[0]}?uid=${splitName[1]}`);
        } else if (
          messageData.name === "reloadlayout" &&
          messageData.id === "reloadlayout"
        ) {
          if (!location.href.endsWith("hello")) {
            location.reload();
          }
        } else {
          router.push(`/hello/${messageData.name}?uid=${messageData.id}`);
        }
      },
      shouldReconnect: (closeEvent) => true,
    }
  );

  return (
    <div>
      {children}
      {connIssue ? (
        <>
          <Portal containerRef={ref}>
            <WarningIcon w={70} h={70} color="orange.400" />
          </Portal>
          <Box m={35} position="fixed" bottom={0} left={0} ref={ref}></Box>
        </>
      ) : undefined}
    </div>
  );
}

export default WebSocket;
