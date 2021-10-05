import { Box } from "@chakra-ui/layout";
import { Flex, Switch } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import AccordionUnit from "../../components/accordionunit";
import AddSkillsForm from "./addskillform";
import { setActive } from "./reducers";
import SkillsList from "./skillslist";

export default function SkillsSection() {
  const dispatch = useAppDispatch();
  //const skills = useAppSelector((state) => state.skills);
  const active = useAppSelector((state) => state.skills.active);
  return (
    <Flex  bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <Switch
          colorScheme="blue"
          name="skillsIsActive"
          isChecked={active}
          onChange={(e) => {
            dispatch(setActive(e.target.checked));
          }}
        />
      </Box>
      <Box flex={1}>
        <AccordionUnit title="Skills" subTitle="list of skills/competencies and the proficiency in each">
          <Box>
            <Box mb={4}>
              <SkillsList />
            </Box>
            <AddSkillsForm />
          </Box>
        </AccordionUnit>
      </Box>
    </Flex>

    // <Box>
    //   <Box mb={4}>
    //     <SkillsList />
    //   </Box>
    //   <AddSkillsForm />
    // </Box>
  );
}
