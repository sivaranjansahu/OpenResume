import { Icon, Box, Tooltip } from "@chakra-ui/react";
import { IoReorderThree } from "react-icons/io5";

export default function Grabber({ disabled = false }: any) {
  return (
    <Tooltip
      hasArrow
      label={`Reorder items`}
      bg="gray.300"
      color="black"
      placement="top"
      closeOnClick={true}
    >
      <Box>
        <Icon
          as={IoReorderThree}
          boxSize={6}
          color={disabled ? "gray.200" : "gray.500"}
          _hover={
            !disabled ? { color: "secondary.400" } : { color: "secondary.200" }
          }
        />
      </Box>
    </Tooltip>
  );
}
