import { Heading } from "@chakra-ui/layout";
import { Flex, Box, Switch } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import AccordionUnit from "../../components/accordionunit";
import { setActive } from "./reducers";
import EducationForm from "./addeducation";
import EducationList from "./educationlist";

export default function Education() {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.education.active);
  return (
    <Flex>
      <Box mr="4" mt={6}>
        <Switch
          colorScheme="blue"
          name="educationIsActive"
          isChecked={active}
          onChange={(e) => {
            dispatch(setActive(e.target.checked));
          }}
        />
      </Box>
      <Box flex={1}>
        <AccordionUnit title="Education">
          <Box>
            <Box mb={4}>
              <EducationList />
            </Box>
            <EducationForm />
          </Box>
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
