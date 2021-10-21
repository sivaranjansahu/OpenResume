import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import AddProjectForm from "./addprojectform";
import ProjectsList from "./projectslist";
import { setActive, setAltName } from "./reducers";
import RenameSection from "../../components/renameSection";
import TipsButton from "../../components/tipsbutton";
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
          <Flex mb={4} alignItems="center" justifyContent="space-between">
          <RenameSection sectionName="projects" setAltName={setAltName}/>
          <TipsButton sectionName="projects" title="Projects"/>
          </Flex>
          
          <ProjectsList />
          <AddProjectForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
