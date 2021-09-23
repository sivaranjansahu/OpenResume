import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Flex, Box } from "@chakra-ui/layout";
import { AccordionButton, Button, Heading } from "@chakra-ui/react";

const ToggleButton: React.FC<{ isExpanded: boolean; title: string }> = ({
  isExpanded,
  title,
}) => {
  return (
    <Heading as="h4">
      <Box
        flex="1"
        px={8}
        py={4}
        minHeight={16}
        backgroundColor="#FAFAFA"
        position="relative"
      >
        {isExpanded && <Heading size="sm">{title}</Heading>}
        <AccordionButton
          position="absolute"
          padding={0}
          right={4}
          top={4}
          width="auto"
          ml="auto"
        >
          <Flex alignItems="center">
            {isExpanded && (
              <Button
                leftIcon={<CloseIcon w={3} h={3} />}
                colorScheme="blue"
                variant="ghost"
                size="sm"
              >
                Close
              </Button>
            )}
            {!isExpanded && (
              <Button
                leftIcon={<AddIcon w={3} h={3} />}
                colorScheme="blue"
                variant="ghost"
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
