import { Box, Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import RenameSection from "../../components/renameSection";
import TipsButton from "../../components/tipsbutton";
import EducationForm from "./addeducation";
import EducationList from "./educationlist";
import { setActive, setAltName } from "./reducers";

export default function Education() {
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <IncludeSwitch setActive={setActive} sectionName="education" />
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Education"
          subTitle="Degrees obtained and the related information"
        >
          <Flex mb={4} alignItems="center" justifyContent="space-between">
          <RenameSection sectionName="education" setAltName={setAltName}/>
          <TipsButton sectionName="education" title="Education"/>
          </Flex>
          
          <EducationList mb={4} />
          <EducationForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
