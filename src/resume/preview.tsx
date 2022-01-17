import { Flex } from "@chakra-ui/layout";
import {
  Box,
  Button, useDisclosure
} from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import { VscSymbolColor } from "react-icons/vsc";
import "simplebar/dist/simplebar.css";
import registerFonts from "../fonts/index";
import { useAppSelector } from "../store/reduxhooks";
import Configurator from "./configurator";
import MyDocument from "./generators/pdf/pdfgen";
import { IProfile } from "./interfaces/forminterfaces";

interface temp {
  resumeData: IProfile;
}

function Preview({ resumeData }: temp) {
  const [accentColor, setAccentColor] = useState("#333");
  const [bodyColor, updateBodyColor] = useState("#fff");
  const [layout, setLayout] = useState("template1");
  const [headingDesign,setHeadingDesign] = useState<number>(0);
  const [headingFont, setHeadingFont] = useState("opensans");
  const [bodyFont, setBodyFont] = useState("opensans");
  const state = useAppSelector((state) => state);

  registerFonts();

  function updateAccentColor(color: string) {
    setAccentColor(color);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Flex width="full" justifyContent="flex-end" mb={4}>
        <Button
          variant="ghost"
          colorScheme="primary"
          onClick={onOpen}
          leftIcon={<VscSymbolColor />}
        >
          Style & Download
        </Button>
      </Flex>

      <Configurator
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        setLayout={setLayout}
        updateAccentColor={updateAccentColor}
        updateBodyColor={updateBodyColor}
        setHeadingFont={setHeadingFont}
        setBodyFont={setBodyFont}
        setHeadingDesign={setHeadingDesign}
        state={state}
        accentColor={accentColor} 
        layout={layout}
        headingFont={headingFont}
        bodyFont={bodyFont}
        headingDesign={headingDesign}
        bodyColor={bodyColor}
      />
      

      <PDFViewer
        width="100%"
        height="900px"
        showToolbar={false}
        className="frame"
      >
        <MyDocument
          state={state}
          accentColor={accentColor}
          bodyColor={bodyColor}
          layout={layout}
          headingFont={headingFont}
          headingDesign={headingDesign}
        bodyFont={bodyFont}
        />
      </PDFViewer>
    </Box>
  );
}
//export default React.memo(Preview);
export default Preview;
