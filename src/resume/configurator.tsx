import { FormControl } from "@chakra-ui/form-control";
import {
  Accordion,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SlideDirection,
  Stack,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { RiDownloadLine } from "react-icons/ri";
import MyDocument from "./generators/pdf/pdfgen";
import ColorPicker from "./preview/components/colorpicker";
import FontPicker from "./preview/components/fontpicker";
import LayoutPicker from "./preview/components/layoutpicker";

type Proptype = {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  state: any;
  accentColor: string;
  updateAccentColor: Function;
  setLayout: Function;
  setSelectedFont: Function;
};

const radioOptions = [
  { key: "pdf", value: "pdf", label: "PDF" },
  { key: "docx", value: "docx", label: "Word" },
];

function DownloadButtons({ state, accentColor, format = "pdf" }: any) {
  return (
    <Flex gridGap={2} p={4}>
      {format==="pdf" && <PDFDownloadLink 
        document={<MyDocument state={state} accentColor={accentColor} />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) => (
          <Button width="290px" leftIcon={<RiDownloadLine />} bgColor="primary.100" color="white">
            {loading ? "Loading" : "Download PDF"}
          </Button>
        )}
      </PDFDownloadLink>}
      {format==="docx" && 
      <Button width="100%" leftIcon={<RiDownloadLine />}  bgColor="primary.100" color="white">
        Download Docx
      </Button>
      }
    </Flex>
  );
}

function Configurator(props: Proptype) {
  const [format,setFormat] = useState('pdf');
  const {
    isOpen,
    onOpen,
    onClose,
    updateAccentColor,
    setLayout,
    setSelectedFont,
    state,
    accentColor,
  } = props;
  const [placement, setPlacement] = useState<SlideDirection>("right");
  return (
    <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
      {/* <DrawerOverlay /> */}
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" px={4}>
          Customize & Download
        </DrawerHeader>
        <DrawerBody pt={8} padding={0}>
          <Box p={4} mb={4}>
            {/* <DownloadType /> */}
            <FormControl>
              <Heading as="h4" size="xs" mb={2}>
                Format
              </Heading>
              <RadioGroup
              onChange={setFormat} value={format}
              >
                <Stack direction="row">
                  {radioOptions.map((r, i) => {
                    return <Radio value={r.value}>{r.label}</Radio>;
                  })}
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
          <Heading as="h4" size="xs" mb={2} px={4}>
            Style
          </Heading>
          <Accordion
            defaultIndex={[0]}
            allowToggle={true}
            allowMultiple={false}
          >
            <ColorPicker setAccentColor={updateAccentColor} />
            <LayoutPicker setLayout={setLayout} />
            <FontPicker setSelectedFont={setSelectedFont} />
          </Accordion>

          <DownloadButtons state={state} format={format} accentColor={accentColor} />
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