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
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
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

interface temp {
  resumeData: IProfile;
}
export default function Preview({ resumeData }: temp) {
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
  const [placement, setPlacement] = useState<SlideDirection>("right");
  return (
    <Box>
      <Flex width="full" justifyContent="space-between">
        <Button mb={4} size="sm" onClick={onOpen} leftIcon={<RiPaletteLine />}>
          Customize
        </Button>
        <Flex gridGap={2}>
          <PDFDownloadLink
            document={<MyDocument state={state} accentColor={accentColor} />}
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) => (
              <Button size="sm" leftIcon={<RiDownloadLine />}>
                {loading ? "Loading" : "PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <Button size="sm" leftIcon={<RiDownloadLine />}>
            DOCX
          </Button>
        </Flex>
      </Flex>

      <Configurator
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        setLayout={setLayout}
        updateAccentColor={updateAccentColor}
        setSelectedFont={setSelectedFont}
      />

      <PDFViewer
        width="100%"
        height="900px"
        showToolbar={false}
        className="frame"
      >
        <MyDocument state={state} accentColor={accentColor} layout={layout} selectedFont={selectedFont} />
      </PDFViewer>
    </Box>
  );
}
