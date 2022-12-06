import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import {
    ChakraProvider,
    Center,
    Heading,
    Spacer,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    StackDivider,
    HStack,
} from "@chakra-ui/react";

import { Axios } from "axios";





function Schedules() {
    const [AllInfo, setAllInfo] = React.useState(null);
    const [GameCounter, setGameCounter] = React.useState(0);
    const count = React.useRef(0);

/*
    useEffect(() => {
        fetch(options.url, { headers: options.headers })
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setAllInfo(json.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
     
    useEffect(() => {
        if (AllInfo != null) {
            setInterval(() => {
                console.log(AllInfo);
                setGameCounter(count.current);
                count.current = count.current + 1;
                console.log(count);
                if (count.current >= AllInfo.length) {
                    count.current = 0;
                }
            }, 10000);
        }
    }, [AllInfo]);
    */
    if (AllInfo == null) {
        return (

            <Box
                border="0px"
                borderColor="gray.300"
                borderRadius="md"
                bg="black"
                color="white"
                w="100%"
                h="100%"
                padding="10"
            >
                <Center>
                Nothing to display
                </Center>
                </Box>
            
            )
    }

    return (
        
            <Box
                border="0px"
                borderColor="gray.300"
                borderRadius="md"
                bg="black"
                color="white"
                w="100%"
                h="100%"
                padding="10"
            >
                <VStack spacing={6} align="stretch">
                    <Box h="80px" bg='black'>
                        <Center>
                            {" "}
                            <Text fontSize="4xl">
                                {" "}
                                {AllInfo && AllInfo[GameCounter]?.shortName}{" "}
                            </Text>{" "}
                        </Center>
                    </Box>

                    <Center>
                        <HStack spacing="150px">
                            <Box w="100px" h="100px">
                                <Center>
                                    {" "}
                                    <Text fontSize="3xl">
                                        {" "}
                                        {AllInfo && AllInfo[GameCounter].awayTeam.name}{" "}
                                    </Text>{" "}
                                </Center>
                                <Spacer />
                                <Center>
                                    {" "}
                                    <Text fontSize="4xl">
                                        {" "}
                                        {AllInfo && AllInfo[GameCounter].awayTeam.score}{" "}
                                    </Text>{" "}
                                </Center>
                            </Box>
                            <Box w="100px" h="100px" bg="black">
                                <Center>
                                    {" "}
                                    <Text fontSize="3xl">
                                        {" "}
                                        {AllInfo && AllInfo[GameCounter].homeTeam.name}{" "}
                                    </Text>{" "}
                                </Center>
                                <Spacer />
                                <Center>
                                    {" "}
                                    <Text fontSize="4xl">
                                        {" "}
                                        {AllInfo && AllInfo[GameCounter].homeTeam.score}{" "}
                                    </Text>{" "}
                                </Center>
                            </Box>
                        </HStack>
                    </Center>

                    <Spacer />

                    <Box h="80px" bg="black">
                        <Center>
                            {" "}
                            {AllInfo &&
                                moment(AllInfo[GameCounter].date).format(
                                    "dddd, MMMM Do, h:mm a"
                                )}{" "}
                        </Center>
                    </Box>
                </VStack>
            </Box>
       
    );
}

export default Schedules;