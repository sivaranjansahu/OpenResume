import { Button } from "@chakra-ui/button";
import {
  Flex,
  HStack,
  Text,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Box,
} from "@chakra-ui/react";

const colors = [
  "000000",
  "0070C0",
  "4472C4",
  "9F5C5C",
  "9F745C",
  "7E9F5C",
  "5C9F93",
  "5C879F",
  "665C9F",
  "9F5C9D",
  "939387",
  "4B606B",
];

const bodyColor = [
  "fff",
  "F2EFE9",
  "EEECE8",
  "F2F2F2",
  "F9F6F2",
  "F7FAF8",
  "F5F9F2",
  "F2F8F9",
  "F2F4F9",
  "F9F2F9",
  "F9F2F3",
];

type propType = {
  setColor: Function;
  type: "body" | "accent";
  selectedColor: string;
};
export default function ColorPicker({
  setColor,
  type,
  selectedColor,
}: propType) {
  const selectedColors = type === "accent" ? colors : bodyColor;
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {type === "accent" ? "Accent color" : "Body color"}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex wrap="wrap" gridGap={2}>
          {selectedColors.map((color, index) => {
            return (
              <Button
                ml={0}
                onClick={() => setColor("#" + color)}
                key={index}
                width={10}
                height={10}
                backgroundColor={"#" + color}
                size="xs"
                borderRadius="full"
                borderWidth={5}
                _hover={{
                  backgroundColor: "#" + color,
                }}
                _active={{
                  backgroundColor: "#" + color,
                }}
                borderColor={
                  selectedColor === "#" + color
                    ? "secondary.400"
                    : "transparent"
                }
              ></Button>
            );
          })}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
