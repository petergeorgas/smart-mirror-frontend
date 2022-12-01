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
		"ws://localhost:8080/face",
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

				if (messageData.name === "reset" && messageData.id === "reset") {
					router.push("/hello");
				} else if (
					(messageData.name === "coreworkout" &&
						messageData.id === "coreworkout") ||
					(messageData.name === "yogaworkout" &&
						messageData.id === "yogaworkout") ||
					(messageData.name === "generalworkout" &&
						messageData.id === "generalworkout")
				) {
					router.push(`/workout/${messageData.name}`);
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
