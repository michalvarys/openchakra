import { Box, Heading, VStack } from "@chakra-ui/react";

export default function Page404() {
  return (
    <Box flex={1} display="flex" w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <VStack>
        <Heading as="h1" size="3xl">Error 404</Heading>
        <Heading as="h2" size="md">Stránka ne-existuje</Heading>
      </VStack>
    </Box>
  )
}