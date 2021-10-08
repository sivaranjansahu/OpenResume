import { Box, Flex, Switch } from "@chakra-ui/react";
import { useAppDispatch } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import AccordionUnit from "../../components/accordionunit";
import BasicInfoForm from "./basicinfoform";

export default function BasicInfo() {
  const dispatch = useAppDispatch();
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box display="flex" alignItems="flex-start">
        <Box mr="4" mt={6}>
          <Switch
            colorScheme="secondary"
            name="basicInfoIsActive"
            isChecked={true}
            isDisabled={true}
            onChange={(e) => {
              //dispatch(setActive(e.target.checked));
              dispatch(setDirty({ isDirty: true }));
            }}
          />
        </Box>
      </Box>
      <Box flex={1}>
        <AccordionUnit
          title="Basic Info"
          subTitle="Required information like name, address, contact info"
        >
          {/* <BasicInfoBlock /> */}
          <BasicInfoForm />
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
