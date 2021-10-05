import AddCourseForm from "./addcourseform";
import { Box, VStack } from "@chakra-ui/layout";
import { Flex, Switch } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import { setActive } from "./reducers";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import CoursesList from "./courseslist";
export default function Courses(){
    const dispatch = useAppDispatch();
    //const skills = useAppSelector((state) => state.skills);
    const active = useAppSelector((state) => state.links.active);
    return(
            <Flex  bg="white" px={4} mb={2}>
              <Box mr="4" mt={6}>
                <Switch
                  colorScheme="blue"
                  name="coursesIsActive"
                  defaultChecked={active}
                  onChange={(e) => {
                    dispatch(setActive(e.target.checked));
                  }}
                />
              </Box>
              <Box flex={1}>
                <AccordionUnit title="Courses" subTitle="and certifications, MOOCs, online learning">
                  <Box>
                    <Box mb={4}>
                      <CoursesList />
                    </Box>
                    <AddCourseForm />
                  </Box>
                </AccordionUnit>
              </Box>
            </Flex>
    )
}