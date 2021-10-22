import { Box, Button, Flex,Checkbox,Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch } from "../../../store/reduxhooks";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import WorkHistoryForm from "./addworkhistoryform";
import { setActive, setAltName } from "./reducers";
import WorkHistoryList from "./workhistorylist";
import RenameSection from "../../components/renameSection"
import TipsButton from "../../components/tipsbutton";

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
          <Flex mb={4} alignItems="center" justifyContent="space-between">
          <RenameSection sectionName="workHistory" setAltName={setAltName}/>
          <TipsButton sectionName="workHistory" title="Work history"/>
          </Flex>
          
          <WorkHistoryList mb={4} />
          <WorkHistoryForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
