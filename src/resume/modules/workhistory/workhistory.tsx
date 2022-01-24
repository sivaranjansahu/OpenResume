import { Box, Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import RenameSection from "../../components/renameSection";
import TipsButton from "../../components/tipsbutton";
import WorkHistoryForm from "./addworkhistoryform";
import { setActive, setAltName } from "./reducers";
import WorkHistoryList from "./workhistorylist";

const sectionName = "workHistory";
export default function WorkHistory() {
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <IncludeSwitch setActive={setActive} sectionName={sectionName} />
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Work history"
          subTitle="Organizations, roles and responsibilities"
        >
          <Flex mb={4} alignItems="center" justifyContent="flex-end">
            <RenameSection sectionName={sectionName} setAltName={setAltName} />
            <TipsButton sectionName={sectionName} title="Work history" />
          </Flex>

          <WorkHistoryList mb={4} />
          <WorkHistoryForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
