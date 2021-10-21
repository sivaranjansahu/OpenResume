import { Box, Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import RenameSection from "../../components/renameSection";
import TipsButton from "../../components/tipsbutton";
import { setActive, setAltName } from "./reducers";
import SummaryForm from "./summaryform";

export default function BasicInfo() {
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box display="flex" alignItems="flex-start">
        <Box mr="4" mt={6}>
          <IncludeSwitch setActive={setActive} sectionName="summary" />
        </Box>
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Summary"
          subTitle="Brief summary of your career/skills and objectives"
        >
          <Flex mb={4} alignItems="center" justifyContent="space-between">
          <RenameSection sectionName="summary" setAltName={setAltName}/>
          <TipsButton sectionName="summary" title="Summary"/>
          </Flex>
          <SummaryForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
