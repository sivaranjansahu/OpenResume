import { Box, Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import { setActive } from "./reducers";
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
          <SummaryForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
