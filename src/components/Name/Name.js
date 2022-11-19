import {
	Button,
	Flex,
	FormLabel,
	HStack,
	Input,
	Spacer,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { getUser, updateName } from "../../firebase/firebase";

function Name(props) {
	const { uid, name, setName } = props;

	const ref = useRef(null);

	const [loadedValue, setLoadedValue] = useState("");

	const onNameChange = () => {
		if (uid && ref?.current?.value && ref?.current?.value !== "") {
			updateName(uid, ref.current.value).then(() => {
				console.log("Successfully updated name.");
				setLoadedValue(ref.current.value);
				setName(ref.current.value);
			});
		}
	};

	useEffect(() => {
		if (uid) {
			getUser(uid).then((user) => {
				if (user.name) {
					setLoadedValue(user.name);
					ref.current.value = user.name;
					setName(user.name);
				}
			});
		}
	});

	return (
		<>
			<HStack>
				<Input
					border="2px"
					borderRadius="md"
					borderColor="gray.100"
					placeholder="Basic usage"
					ref={ref}
					defaultValue={loadedValue === "" ? undefined : loadedValue}
				/>
				<Spacer />
				<Button colorScheme="blue" onClick={onNameChange}>
					Change
				</Button>
			</HStack>
		</>
	);
}

export default Name;
