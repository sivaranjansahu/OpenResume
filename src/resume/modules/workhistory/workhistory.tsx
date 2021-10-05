import { Box, Flex, Switch } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import AccordionUnit from "../../components/accordionunit";
import AddSkillsForm from "../skills/addskillform";
import SkillsList from "../skills/skillslist";
import WorkHistoryForm from "./addworkhistoryform";
import { setActive } from "./reducers";
import WorkHistoryList from "./workhistorylist";

export default function WorkHistory() {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.workHistory.active);
  console.log("active", active);
  return (
    <Flex  bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <Switch
          colorScheme="blue"
          name="workHistoryIsActive"
          isChecked={active}
          onChange={(e) => {
            dispatch(setActive(e.target.checked));
          }}
        />
      </Box>
      <Box flex={1}>
        <AccordionUnit title="Work history" subTitle="Organizations, roles and responsibilities">
          <Box>
            <Box mb={4}>
              <WorkHistoryList />
            </Box>
            <WorkHistoryForm />
          </Box>
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
