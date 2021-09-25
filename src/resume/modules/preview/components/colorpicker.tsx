import { Button } from "@chakra-ui/button";
import { Flex, HStack, Text } from "@chakra-ui/react";

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
    <Flex alignItems="center" my={4} gridGap={2}>
      <Text>Accent color</Text>
      <HStack>
        {colors.map((color, index) => {
          return (
            <Button
              onClick={() => setAccentColor("#" + color)}
              key={index}
              backgroundColor={"#" + color}
              size="xs"
              borderRadius="full"
            ></Button>
          );
        })}
      </HStack>
    </Flex>
  );
}
