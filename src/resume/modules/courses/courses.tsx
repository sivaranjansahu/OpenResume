import { Box } from "@chakra-ui/layout";
import { Flex, useDisclosure } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import RenameSection from "../../components/renameSection";
import TipsButton from "../../components/tipsbutton";
import AddCourseForm from "./addcourseform";
import CoursesList from "./courseslist";
import { setActive, setAltName } from "./reducers";

export default function Courses() {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <IncludeSwitch setActive={setActive} sectionName="courses" />
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Courses"
          subTitle="and certifications, MOOCs, online learning"
        >
          <Flex mb={4} alignItems="center" justifyContent="space-between">
          <RenameSection sectionName="courses" setAltName={setAltName}/>
          <TipsButton sectionName="courses" title="Courses"/>
          </Flex>
          <CoursesList mb={4} />
          <AddCourseForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
