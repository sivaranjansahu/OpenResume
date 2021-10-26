import { FormControl } from "@chakra-ui/form-control";
import {
  Accordion,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SlideDirection,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { RiDownloadLine } from "react-icons/ri";
import { VscClose, VscCloudDownload } from "react-icons/vsc";
import { number } from "yup";
import generateTestDoc from "./generators/docx/docxgen";
import MyDocument from "./generators/pdf/pdfgen";
import ColorPicker from "./preview/components/colorpicker";
import FontPicker from "./preview/components/fontpicker";
import HeadingPicker from "./preview/components/headingDesignPicker";
import LayoutPicker from "./preview/components/layoutpicker";

type Proptype = {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  state: any;
  accentColor: string;
  updateAccentColor: Function;
  updateBodyColor: Function;
  setLayout: Function;
  setHeadingFont: Function;
  setBodyFont: Function;
  setHeadingDesign: Function;
  layout: string;
  headingFont: string;
  bodyFont: string;
  bodyColor: string;
  headingDesign: number;
};

const radioOptions = [
  { key: "pdf", value: "pdf", label: "PDF" },
  { key: "docx", value: "docx", label: "Word" },
];

function DownloadButtons({
  state,
  accentColor,
  format = "pdf",
  headingFont,
  bodyFont,
  layout,
  bodyColor,
  headingDesign,
}: any) {
  return (
    <Flex gridGap={2} p={4}>
      {format === "pdf" && (
        <PDFDownloadLink
          document={
            <MyDocument
              state={state}
              accentColor={accentColor}
              layout={layout}
              headingFont={headingFont}
              bodyFont={bodyFont}
              bodyColor={bodyColor}
              headingDesign={headingDesign}
            />
          }
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) => (
            <Button
              width="290px"
              leftIcon={<VscCloudDownload />}
              bgColor="primary.400"
              color="white"
            >
              {loading ? "Loading" : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      )}
      {format === "docx" && (
        <Button
          width="100%"
          leftIcon={<VscCloudDownload />}
          bgColor="primary.400"
          color="white"
          onClick={() =>
            generateTestDoc(state, {
              headerstyle: "style1",
              headerFont: "Palatino",
              bodyFont: "Lato",
              colorScheme: {
                headerColor: accentColor,
                subHeaderColor: "2F5496",
                bodyColor: bodyColor,
                shadingColor: "eaeaea",
                bodyTextColor: "333333",
              },
            })
          }
          //onClick={() => generateHeadings(state)}
        >
          Download Docx
        </Button>
      )}
    </Flex>
  );
}

function Configurator(props: Proptype) {
  const [format, setFormat] = useState("pdf");
  const {
    isOpen,
    onOpen,
    onClose,
    updateAccentColor,
    updateBodyColor,
    setLayout,
    setHeadingFont,
    setBodyFont,
    setHeadingDesign,
    state,
    accentColor,
    headingFont,
    bodyFont,
    bodyColor,
    headingDesign,
  } = props;
  const [placement, setPlacement] = useState<SlideDirection>("right");
  return (
    <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
      {/* <DrawerOverlay /> */}
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" px={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Text>Style & Download</Text>
            <Box onClick={onClose} _hover={{ cursor: "pointer", color: "red" }}>
              <Icon as={VscClose} />
            </Box>
          </Flex>
        </DrawerHeader>
        <DrawerBody pt={8} padding={0}>
          <Heading as="h4" size="sm" mt={4} mb={2} px={4}>
            Format
          </Heading>
          <Box px={4} mb={4}>
            {/* <DownloadType /> */}
            <FormControl>
              <RadioGroup onChange={setFormat} value={format}>
                <Stack direction="row">
                  {radioOptions.map((r, i) => {
                    return <Radio value={r.value}>{r.label}</Radio>;
                  })}
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mb={4}>
            <Heading as="h4" size="sm" mb={2} px={4}>
              Layouts
            </Heading>
            <Accordion allowToggle={true}>
              <LayoutPicker setLayout={setLayout} />
              <HeadingPicker
                setHeadingDesign={setHeadingDesign}
                selectedDesign={headingDesign}
              />
            </Accordion>
          </Box>
          <Box mb={4}>
            <Heading as="h4" size="sm" mb={2} px={4}>
              Colors
            </Heading>
            <Accordion
              defaultIndex={[0]}
              allowToggle={true}
              allowMultiple={false}
            >
              <ColorPicker
                type="accent"
                setColor={updateAccentColor}
                selectedColor={accentColor}
              />
              <ColorPicker
                type="body"
                setColor={updateBodyColor}
                selectedColor={bodyColor}
              />
            </Accordion>
          </Box>
          <Box mb={4}>
            <Heading as="h4" size="sm" mb={2} px={4}>
              Fonts
            </Heading>
            <Accordion allowToggle={true}>
              <FontPicker type="heading" setSelectedFont={setHeadingFont} />
              <FontPicker type="body" setSelectedFont={setBodyFont} />
            </Accordion>
          </Box>
          <DownloadButtons
            state={state}
            format={format}
            accentColor={accentColor}
            headingFont={headingFont}
            bodyFont={bodyFont}
            bodyColor={bodyColor}
            headingDesign={headingDesign}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

// function FontPicker({ setSelectedFont }: any) {
//   const fonts = ["opensans", "roboto", "inter", "quicksand", "koh"];
//   const [fontIndex, setFontIndex] = useState(0);
//   function updateFont(font: string, index: number) {
//     setSelectedFont(font);
//     setFontIndex(index);
//   }
//   return (
//     <Accordion defaultIndex={[0]} allowMultiple>
//       <AccordionItem>
//         <h2>
//           <AccordionButton>
//             <Box flex="1" textAlign="left">
//               Choose font
//             </Box>
//             <AccordionIcon />
//           </AccordionButton>
//         </h2>
//         <AccordionPanel pb={4}>
//           {fonts.map((font, index) => {
//             return (
//               <Button
//                 key={index}
//                 onClick={() => updateFont(font, index)}
//                 colorScheme={fontIndex === index ? "blue" : "gray"}
//               >
//                 {font}
//               </Button>
//             );
//           })}
//         </AccordionPanel>
//       </AccordionItem>
//     </Accordion>
//   );
// }

export default Configurator;
