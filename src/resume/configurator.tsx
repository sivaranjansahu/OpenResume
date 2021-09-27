import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  SlideDirection,
  useDisclosure,
  Select,
  AccordionButton,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { FormLabel, FormControl } from "@chakra-ui/form-control";
import { useState } from "react";
import DownloadType from "./components/filetypeswitch";
import { IProfile } from "./interfaces/forminterfaces";
import ColorPicker from "./preview/components/colorpicker";
import LayoutPicker from "./preview/components/layoutpicker";
import FontPicker from './preview/components/fontpicker';

type Proptype = {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  updateAccentColor: Function;
  setLayout: Function;
  setSelectedFont: Function;
};

function Configurator(props: Proptype) {
  const {
    isOpen,
    onOpen,
    onClose,
    updateAccentColor,
    setLayout,
    setSelectedFont,
  } = props;
  const [placement, setPlacement] = useState<SlideDirection>("right");
  return (
    <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
      {/* <DrawerOverlay /> */}
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Customize</DrawerHeader>
        <DrawerBody pt={8} padding={0}>
          {/* <DownloadType /> */}
          <Accordion
            defaultIndex={[0]}
            allowToggle={true}
            allowMultiple={false}
          >
            <ColorPicker setAccentColor={updateAccentColor} />
            <LayoutPicker setLayout={setLayout} />
            <FontPicker setSelectedFont={setSelectedFont} />
          </Accordion>
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
