import { Box, Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import RenameSection from "../../components/renameSection";
import TipsButton from "../../components/tipsbutton";
//import { setActive, setAltName } from "./reducers";
import SummaryForm from "./addcustomsectionform";

type propsTypes={
  sectionData:{
    title:string,
    content:string
  }
}

export default function CustomSection(props:propsTypes) {
  const {sectionData} = props;
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box display="flex" alignItems="flex-start">
        <Box mr="4" mt={6}>
          {/* <IncludeSwitch setActive={setActive} sectionName="summary" /> */}
        </Box>
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title={sectionData.title}
          
        >
          <Flex mb={4} alignItems="center" justifyContent="space-between">
         
          </Flex>
          {
            sectionData.content
          }
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
 