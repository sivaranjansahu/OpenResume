import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import AddSkillsForm from "./addskillform";
import { setActive } from "./reducers";
import SkillsList from "./skillslist";

export default function SkillsSection() {
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <IncludeSwitch setActive={setActive} sectionName="skills" />
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Skills"
          subTitle="list of skills/competencies and the proficiency in each"
        >
          <SkillsList mb={4} />
          <AddSkillsForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
