import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
	const testprops = [{ monkey: "tests" }];
	return (
		<ChakraProvider>
			<Component {...pageProps} {...testprops} />
		</ChakraProvider>
	);
}

export default MyApp;
