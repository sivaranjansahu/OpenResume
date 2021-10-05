import AddLinkForm from "./addlinkform";
import { Box, VStack } from "@chakra-ui/layout";
import { Flex, Switch } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import { setActive } from "./reducers";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import LinksList from "./linkslist";
export default function Links(){
    const dispatch = useAppDispatch();
    //const skills = useAppSelector((state) => state.skills);
    const active = useAppSelector((state) => state.links.active);
    return(
            <Flex   bg="white" px={4} mb={2}>
              <Box mr="4" mt={6}>
                <Switch
                  colorScheme="blue"
                  name="linksIsActive"
                  isChecked={active}
                  onChange={(e) => {
                    dispatch(setActive(e.target.checked));
                  }}
                />
              </Box>
              <Box flex={1}>
                <AccordionUnit title="Links" subTitle="Relevant links like portfolio website, LinkedIn, work hosted online.">
                  <Box>
                    <Box mb={4}>
                      <LinksList />
                    </Box>
                    <AddLinkForm />
                  </Box>
                </AccordionUnit>
              </Box>
            </Flex>
    )
}