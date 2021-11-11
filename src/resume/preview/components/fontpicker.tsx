import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import fontImages from "../../../assets/fonts/docx";

type propType = {
  setSelectedFont: any;
  type: "heading" | "body";
  format: string;
};

function FontPicker({ setSelectedFont, type, format }: propType) {
  let fontsList;

  const pdfFonts = ["opensans", "roboto", "inter", "quicksand", "lora", "lato"];
  const docxFonts = [
    "Segoe UI",
    "Arial",
    "Times New Roman",
    "Lato",
    "Georgia",
    "Garamond",
    "Fira Sans",
    "Palatino",
    "Avenir",
    "Roboto",
    "Open Sans",
  ];
  const [fontIndex, setFontIndex] = useState(0);
  function updateFont(font: string, index: number) {
    setSelectedFont(font);
    setFontIndex(index);
  }
  fontsList = format === "docx" ? docxFonts : pdfFonts;
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {type === "heading" ? "Heading font" : "Body font"}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {fontsList.map((font: string, index: number) => {
          return (
            //font.replaceAll(" ", "").toLowerCase()
            <>
              <Image
                onClick={() => updateFont(font, index)}
                borderWidth={3}
                m={1}
                h={10}
                borderStyle="solid"
                borderColor={
                  fontIndex === index ? "primary.400" : "transparent"
                }
                _hover={{
                  borderColor: "secondary.400",
                  cursor: "pointer",
                }}
                src={fontImages[font.replaceAll(" ", "").toLowerCase()]}
              />
              {/* <Button
                key={index}
                size="sm"
                m={1}
                onClick={() => updateFont(font, index)}
                colorScheme={fontIndex === index ? "blue" : "gray"}
              >
                {font}
              </Button> */}
            </>
          );
        })}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default FontPicker;
