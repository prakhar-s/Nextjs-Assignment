import React from "react";
import { ChakraProvider, Container, theme } from "@chakra-ui/core";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="xl" pt={8}>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
