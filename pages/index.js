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
  Button,
  Image,
  List,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const LoginClick = () => {
    router.push("/Login");
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignContent="center"
      justifyContent="center"
    >
      <Center>
        <Box
          border="2px"
          borderColor="gray.300"
          borderRadius="md"
          bg="gray.50"
          color="black"
          w="600px"
          padding="10"
        >
          <VStack h="100%">
            <Heading as="h1" size="2xl">
              Smart Mirror
            </Heading>
            <Text as="h2" fontSize="2xl">
              An EECS 4020 Project
            </Text>
            <Image
              alt="eecs-4020-team"
              border="2px"
              borderRadius="md"
              h="500px"
              src="https://i.imgur.com/B2O5WS8.jpg"
            />
            <HStack
              textAlign="center"
              fontSize="2xl"
              fontWeight="bold"
              padding="2"
            >
              <Text padding="2">Peter Georgas</Text>
              <Text padding="2">Logan Rising</Text>
              <Text padding="2">William Beck</Text>
              <Text padding="2">Brad Hetrick</Text>
              <Text padding="2">Jonah Eck</Text>
            </HStack>
            <Button onClick={LoginClick} padding="6" colorScheme="blue">
              Login
            </Button>
          </VStack>
        </Box>
      </Center>
    </Flex>
  );
}
