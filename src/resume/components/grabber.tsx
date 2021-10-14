import { Icon } from "@chakra-ui/react";
import { IoReorderThree } from "react-icons/io5";

export default function Grabber() {
  return (
    <Icon
      as={IoReorderThree}
      boxSize={6}
      color="gray.500"
      _hover={{ color: "secondary.400" }}
    />
  );
}
