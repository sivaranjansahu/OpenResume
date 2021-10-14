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
  const [layout, setLayout] = useState("template1");
  const [selectedFont, setSelectedFont] = useState("opensans");
  const state = useAppSelector((state) => state);

  registerFonts();

  function updateAccentColor(color: string) {
    setAccentColor(color);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState(0);
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
        setSelectedFont={setSelectedFont}
        state={state}
        accentColor={accentColor}
        layout={layout}
        selectedFont={selectedFont}
      />
      <button
        onClick={() => {
          setPlacement(placement + 1);
        }}
      >
        refresh
      </button>

      <PDFViewer
        width="100%"
        height="900px"
        showToolbar={false}
        className="frame"
        key={placement}
      >
        <MyDocument
          state={state}
          accentColor={accentColor}
          layout={layout}
          selectedFont={selectedFont}
        />
      </PDFViewer>
    </Box>
  );
}
//export default React.memo(Preview);
export default Preview;
