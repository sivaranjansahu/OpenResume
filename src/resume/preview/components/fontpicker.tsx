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

type propType={
  setSelectedFont:any,
  type:"heading"|"body"
}

function FontPicker({ setSelectedFont,type }: propType) {
  const fonts = ["opensans", "roboto", "inter", "quicksand", "lora","lato"];
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
              {type==="heading" ? "Heading font" : "Body font"}
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
