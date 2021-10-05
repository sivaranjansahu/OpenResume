import AddProjectForm from "./addprojectform";
import { Box, VStack } from "@chakra-ui/layout";
import { Flex, Switch } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import { setActive } from "./reducers";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import ProjectsList from "./projectslist";
export default function Projects(){
    const dispatch = useAppDispatch();
    //const skills = useAppSelector((state) => state.skills);
    const active = useAppSelector((state) => state.links.active);
    return(
            <Flex  bg="white" px={4} mb={2}>
              <Box mr="4" mt={6}>
                <Switch
                  colorScheme="blue"
                  name="projectsIsActive"
                  isChecked={active}
                  onChange={(e) => {
                    dispatch(setActive(e.target.checked));
                  }}
                />
              </Box>
              <Box flex={1}>
                <AccordionUnit title="Projects" subTitle="Highlight relevant recent work">
                  <Box>
                    <Box mb={4}>
                      <ProjectsList />
                    </Box>
                    <AddProjectForm />
                  </Box>
                </AccordionUnit>
              </Box>
            </Flex>
    )
}