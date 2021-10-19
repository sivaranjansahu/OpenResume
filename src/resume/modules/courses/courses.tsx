import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import RenameSection from "../../components/renameSection";
import AddCourseForm from "./addcourseform";
import CoursesList from "./courseslist";
import { setActive, setAltName } from "./reducers";
export default function Courses() {
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
          <RenameSection sectionName="courses" setAltName={setAltName}/>
          <CoursesList mb={4} />
          <AddCourseForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
