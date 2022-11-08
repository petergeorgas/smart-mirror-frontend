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
    HStack
} from '@chakra-ui/react';

function Map() {
    return (
        <div bg="gray" h="100vh">
            <Box
                as="iframe"
                title="Work Route"
                border="2px"
                borderColor="gray.300"
                borderRadius="md"
                bg="gray.600"
                color="white"
                w="800px"
                h="400px"
                padding="10"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen=""
                src="https://www.google.com/maps/embed/v1/directions?origin=place_id:ChIJScxbM7-WMIgRZS4whoS0Zzw&destination=place_id:ChIJn6btdMp4PIgRdbWVrQ87x_k&key=AIzaSyBzkJwRb9PUctHdPWU66dVgX6lpY288Fts"

            >
            </Box>
        //</div>
    );
}

export default Map;