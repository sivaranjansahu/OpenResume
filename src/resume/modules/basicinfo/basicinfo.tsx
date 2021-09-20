import { Flex, Box, Switch } from "@chakra-ui/react";
import AccordionUnit from "../../components/accordionunit";
import BasicInfoBlock from "./basicinfoblock";
import BasicInfoForm from "./basicinfoform";

export default function BasicInfo() {
  return (
    <Flex>
      <Box display="flex" alignItems="flex-start">
        <Box mr="4" mt={6}>
          <Switch
            colorScheme="blue"
            name="basicInfoIsActive"
            checked={true}
            isDisabled={true}
            onChange={(e) => {
              //dispatch(setActive(e.target.checked));
            }}
          />
        </Box>
      </Box>
      <Box flex={1}>
        <AccordionUnit title="Basic Info">
          {/* <BasicInfoBlock /> */}
          <BasicInfoForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}