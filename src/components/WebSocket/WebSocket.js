import { useRouter } from "next/router";
import React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

function WebSocket(props) {
  const { children } = props;
  const router = useRouter();

  // TODO: Remove this?
  const { lastJsonMessage, readyState } = useWebSocket(
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

        const messageData = JSON.parse(ev.data);
        console.log(messageData);

        if (messageData.Name === "reset" && messageData.id === "reset") {
          router.push("/hello");
        } else {
          router.push(`/hello/${messageData.name}?uid=${messageData.id}`);
        }
      },
      shouldReconnect: (closeEvent) => true,
    }
  );

  return <div>{children}</div>;
}

export default WebSocket;
