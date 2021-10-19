import { Box, Button, Flex,Checkbox,Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch } from "../../../store/reduxhooks";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import WorkHistoryForm from "./addworkhistoryform";
import { setActive, setAltName } from "./reducers";
import WorkHistoryList from "./workhistorylist";
import RenameSection from "../../components/renameSection"

export default function WorkHistory() {
  const dispatch = useAppDispatch();
  const [isRenameActive,setRenameActive] = useState(false)
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
          <RenameSection sectionName="workHistory" setAltName={setAltName}/>
          <WorkHistoryList mb={4} />
          <WorkHistoryForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
