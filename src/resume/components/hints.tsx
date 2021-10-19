import { Accordion,Text, Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, FormControl, Heading, Icon, Radio, RadioGroup, SlideDirection, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { VscClose } from "react-icons/vsc";

type Proptype = {
    isOpen: boolean;
    onOpen: any; 
    onClose: any;
    blacklist?:string[];
    whitelist?:string[];
    
  };
export default function Hints(props: Proptype) {
    const [format, setFormat] = useState("pdf");
    const {
      isOpen,
      onOpen,
      onClose,
      blacklist=[],
      whitelist=[]
     
    } = props;
    const [placement, setPlacement] = useState<SlideDirection>("right");
    return (
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" px={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>Hints</Text>
              <Box onClick={onClose} _hover={{ cursor: "pointer", color: "red" }}>
                <Icon as={VscClose} />
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody pt={8} padding={0}>
            <Box p={4} mb={4}>
              {/* <DownloadType /> */}
              
            </Box>
            <Heading as="h4" size="xs" mb={2} px={4}>
              Blacklist
            </Heading>
            <Box>
                {JSON.stringify(blacklist)}
            </Box>
            <Heading as="h4" size="xs" mb={2} px={4}>
              Whitelist
            </Heading>
            <Box>
                {JSON.stringify(whitelist)}
            </Box>
            <Accordion
              defaultIndex={[0]}
              allowToggle={true}
              allowMultiple={false}
            >
            </Accordion>
  
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }