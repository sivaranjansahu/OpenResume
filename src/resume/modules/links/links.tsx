import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import IncludeSwitch from "../../components/includeSwitch";
import AddLinkForm from "./addlinkform";
import LinksList from "./linkslist";
import { setActive } from "./reducers";
export default function Links() {
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box mr="4" mt={6}>
        <IncludeSwitch setActive={setActive} sectionName="links" />
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Links"
          subTitle="Relevant links like portfolio website, LinkedIn, work hosted online."
        >
          <LinksList />
          <AddLinkForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
