import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
function FontPicker({ setSelectedFont }: any) {
  const fonts = ["opensans", "roboto", "inter", "quicksand", "koh"];
  const [fontIndex, setFontIndex] = useState(0);
  function updateFont(font: string, index: number) {
    setSelectedFont(font);
    setFontIndex(index);
  }
  return (
    
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Font
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {fonts.map((font, index) => {
            return (
              <Button
                key={index}
                onClick={() => updateFont(font, index)}
                colorScheme={fontIndex === index ? "blue" : "gray"}
              >
                {font}
              </Button>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    
  );
}

export default FontPicker;
