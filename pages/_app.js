import { ChakraProvider } from "@chakra-ui/react";
import "../src/components/Calendar/Calendar.css";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
