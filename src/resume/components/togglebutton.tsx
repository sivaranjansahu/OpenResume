import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Flex, Box } from "@chakra-ui/layout";
import { AccordionButton, Button, Heading } from "@chakra-ui/react";

const ToggleButton: React.FC<{
  isExpanded: boolean;
  title: string;
  label?: string;
}> = ({
  isExpanded,

  label = "New",
}) => {
  return (
    <Heading as="h4" mt={2}>
      <Box
        flex="1"
        py={2}
        minHeight={16}
        // backgroundColor="#FAFAFA"
        position="relative"
      >
        {/* {isExpanded && <Heading size="sm">{title}</Heading>} */}
        <AccordionButton
          position="absolute"
          padding={0}
          right={2}
          top={4}
          width="auto"
          ml="auto"
        >
          <Flex alignItems="center">
            {isExpanded && (
              <Button
                leftIcon={<CloseIcon w={3} h={3} />}
                colorScheme="primary"
                size="sm"
                variant={label === "New section" ? "outline" : "solid"}
              >
                Cancel
              </Button>
            )}
            {!isExpanded && (
              <Button
                leftIcon={<AddIcon w={3} h={3} />}
                colorScheme="primary"
                size="sm"
                variant={label === "New section" ? "outline" : "solid"}
              >
                {label}
              </Button>
            )}
          </Flex>
        </AccordionButton>
      </Box>
    </Heading>
  );
};

export default ToggleButton;
