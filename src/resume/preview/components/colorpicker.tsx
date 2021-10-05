import { Button } from "@chakra-ui/button";
import { Flex, HStack, Text ,AccordionItem,AccordionIcon,AccordionPanel,AccordionButton,Box} from "@chakra-ui/react";

const colors = [
  "F56565",
  "DD6B20",
  "D69E2E",
  "2F855A",
  "319795",
  "00B5D8",
  "3182CE",
  "purple",
  "553C9A",
  "718096",
];
type propType = {
  setAccentColor: Function;
};
export default function ColorPicker({ setAccentColor }: propType) {
  return (
    <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Accent color
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
      <Flex wrap="wrap" gridGap={2}>
        {colors.map((color, index) => {
          return (
            <Button
            ml={0}
              onClick={() => setAccentColor("#" + color)}
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
