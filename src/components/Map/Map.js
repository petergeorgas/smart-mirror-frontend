import {
    Box,
} from '@chakra-ui/react';

function Map() {

    const originid = "ChIJScxbM7-WMIgRZS4whoS0Zzw";
    const destid = "ChIJn6btdMp4PIgRdbWVrQ87x_k";

    const srcstring = `https://www.google.com/maps/embed/v1/directions?origin=place_id:${originid}&destination=place_id:${destid}&key=AIzaSyBzkJwRb9PUctHdPWU66dVgX6lpY288Fts `;

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
                src={srcstring}

            >
            </Box>
        //</div>
    );
}

export default Map;