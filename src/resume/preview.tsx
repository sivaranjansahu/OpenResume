import { Flex } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  SlideDirection,
  useDisclosure,
} from "@chakra-ui/react";
import { PDFDownloadLink, PDFViewer, BlobProvider } from "@react-pdf/renderer";
import React, { useState } from "react";
import {
  RiDownloadLine,
  RiFileDownloadLine,
  RiPaletteLine,
} from "react-icons/ri";
import "simplebar/dist/simplebar.css";
import { useAppSelector } from "../store/reduxhooks";
import DownloadType from "./components/filetypeswitch";
import { IProfile } from "./interfaces/forminterfaces";
import ColorPicker from "./preview/components/colorpicker";
import MyDocument from "./generators/pdf/pdfgen";
import Configurator from "./configurator";
import registerFonts from "../fonts/index";
import { VscSymbolColor } from "react-icons/vsc";

interface temp {
  resumeData: IProfile;
}

function Preview({ resumeData }: temp) {
  const [templateId, setTemplateId] = useState<string>("temp1");
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
