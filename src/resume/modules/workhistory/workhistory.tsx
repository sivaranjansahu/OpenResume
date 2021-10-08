import { Box, Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import WorkHistoryForm from "./addworkhistoryform";
import { setActive } from "./reducers";
import WorkHistoryList from "./workhistorylist";

export default function WorkHistory() {
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <IncludeSwitch setActive={setActive} sectionName="workHistory" />
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Work history"
          subTitle="Organizations, roles and responsibilities"
        >
          <WorkHistoryList mb={4} />
          <WorkHistoryForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
