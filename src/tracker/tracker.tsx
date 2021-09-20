import { Container } from "@chakra-ui/layout";
import { Box, Flex, Heading } from "@chakra-ui/react";

export default function Tracker() {
  return (
    <Container width="100%" maxW="1400px" mx="auto" h="100vh">
      <Box as="section" pt={10}>
        <Flex mb={16} justifyContent="space-between">
          <Heading size="lg">Learn</Heading>
        </Flex>
      </Box>
    </Container>
  );
}
