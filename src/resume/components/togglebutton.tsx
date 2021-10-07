import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Flex, Box } from "@chakra-ui/layout";
import { AccordionButton, Button, Heading } from "@chakra-ui/react";

const ToggleButton: React.FC<{ isExpanded: boolean; title: string }> = ({
  isExpanded,
  title,
}) => {
  return (
    <Heading as="h4" mt={8}>
      <Box
        flex="1"
        // px={8}
        borderTopWidth={1}
        borderTopColor={isExpanded ? "gray.200" : "transparent"}
        py={2}
        minHeight={16}
        // backgroundColor="#FAFAFA"
        position="relative"
      >
        {isExpanded && <Heading size="sm">{title}</Heading>}
        <AccordionButton
          position="absolute"
          padding={0}
          right={2}
          top={2}
          width="auto"
          ml="auto"
        >
          <Flex alignItems="center">
            {isExpanded && (
              <Button
                leftIcon={<CloseIcon w={3} h={3} />}
                colorScheme="secondary"
                size="sm"
              >
                Cancel
              </Button>
            )}
            {!isExpanded && (
              <Button
                leftIcon={<AddIcon w={3} h={3} />}
                colorScheme="secondary"
                size="sm"
              >
                New
              </Button>
            )}
          </Flex>
        </AccordionButton>
      </Box>
    </Heading>
  );
};

export default ToggleButton;
