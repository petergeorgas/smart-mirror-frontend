import {
    Box,
} from '@chakra-ui/react';

function Map() {

    const originid = "ChIJScxbM7-WMIgRZS4whoS0Zzw";
    const destid = "ChIJn6btdMp4PIgRdbWVrQ87x_k";

    const srcstring = `https://www.google.com/maps/embed/v1/directions?origin=place_id:${originid}&destination=place_id:${destid}&key=AIzaSyBzkJwRb9PUctHdPWU66dVgX6lpY288Fts `;

    return (
            <Box
                as="iframe"
                title="Work Route"
                border="2px"
                borderColor="red"
                borderRadius="5"
                bg="black"
                color="white"
                w="100%"
                h="100%"
                padding="5"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen=""
                src={srcstring}
            >
            </Box>
    );
}

export default Map;
