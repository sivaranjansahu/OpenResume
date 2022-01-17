import { Button } from "@chakra-ui/button";
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex } from "@chakra-ui/react";

const colors = [
  "9F5C5C",
  "9F745C",
  "7E9F5C",
  "5C9F93",
  "5C879F",
  "665C9F",
  "9F5C9D",
  
];

const bodyColor = ["fff","fafafa","F9F6F2","F5F9F2","F2F8F9","F2F4F9","F9F2F9","F9F2F3"];

type propType = {
  setColor: Function;
  type:"body"|"accent"
};
export default function ColorPicker({ setColor,type }: propType) {
  const selectedColors = type==="accent" ? colors:bodyColor;
  return (
    <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {type==="accent" ? "Accent color" : "Body color"}
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
              backgroundColor={"#" + color}
              size="xs"
              borderRadius="full"
            ></Button>
          );
        })}
      </Flex>
      </AccordionPanel></AccordionItem>
  );
}
