import { InputGroup } from "@chakra-ui/input";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Select,
  SlideDirection,
  useDisclosure,
} from "@chakra-ui/react";
import SimpleBar from "simplebar-react";

import "simplebar/dist/simplebar.css";
import { Box, Flex } from "@chakra-ui/layout";
import { IProfile, ISkill } from "./interfaces/forminterfaces";
import Template1 from "./templates/template1";
import Template from "./templates/templateselector";
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MyDocument from "./pdf";
import { useAppSelector } from "../store/reduxhooks";
import DownloadType from "./components/filetypeswitch";
import ColorPicker from "./modules/preview/components/colorpicker";
import {
  pdf,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { RiFileDownloadLine, RiPaletteLine } from "react-icons/ri";

interface temp {
  resumeData: IProfile;
}
export default function Preview({ resumeData }: temp) {
  const [templateId, setTemplateId] = useState<string>("temp1");
  const [accentColor, setAccentColor] = useState("#333");
  const state = useAppSelector((state) => state);
  function updateAccentColor(color: string) {
    setAccentColor(color);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState<SlideDirection>("right");
  return (
    <Flex flexDir="column">
      <Flex alignSelf="flex-end" gridGap={2}>
        <PDFDownloadLink
          document={<MyDocument state={state} accentColor={accentColor} />}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) => (
            <Button leftIcon={<RiFileDownloadLine />}>
              {loading ? "Loading" : "Download"}
            </Button>
          )}
        </PDFDownloadLink>
        <Button mb={4} ml="auto" onClick={onOpen} leftIcon={<RiPaletteLine />}>
          Customize
        </Button>
      </Flex>

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        {/* <DrawerOverlay /> */}
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <DownloadType />
            <ColorPicker setAccentColor={updateAccentColor} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <PDFViewer
        width="100%"
        height="900px"
        showToolbar={false}
        className="frame"
      >
        <MyDocument state={state} accentColor={accentColor} />
      </PDFViewer>
    </Flex>
  );
}
