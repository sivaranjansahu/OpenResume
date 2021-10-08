import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import AddProjectForm from "./addprojectform";
import ProjectsList from "./projectslist";
import { setActive } from "./reducers";
export default function Projects() {
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <IncludeSwitch setActive={setActive} sectionName="projects" />
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Projects"
          subTitle="Highlight relevant recent work"
        >
          <ProjectsList />
          <AddProjectForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
