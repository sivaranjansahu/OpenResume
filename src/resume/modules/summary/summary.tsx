import { Box, Flex, Switch } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import SummaryForm from "./summaryform";

export default function BasicInfo() {
  return (
    <Flex  bg="white" px={4} mb={2}>
      <Box display="flex" alignItems="flex-start">
        <Box mr="4" mt={6}>
          <Switch
            colorScheme="blue"
            name="summaryIsActive"
            defaultChecked={true}
            onChange={(e) => {
              //dispatch(setActive(e.target.checked));
            }}
          />
        </Box>
      </Box>
      <Box flex={1}>
        <AccordionUnit title="Summary" subTitle="Brief summary of your career/skills and objectives">
          {/* <BasicInfoBlock /> */}
          <SummaryForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
