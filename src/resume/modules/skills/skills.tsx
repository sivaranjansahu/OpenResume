import SkillsList from "./skillslist";
import AddSkillsForm from "./addskillform";
import { SkillsContext } from "../../profilebuilder";
import { useContext } from "react";
import { Box, VStack } from "@chakra-ui/layout";
import { Flex, Switch } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import { setActive } from "./reducers";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";

export default function SkillsSection() {
  const dispatch = useAppDispatch();
  //const skills = useAppSelector((state) => state.skills);
  const active = useAppSelector((state) => state.skills.active);
  return (
    <Flex>
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
        <AccordionUnit title="Skills">
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
