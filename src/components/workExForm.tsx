import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FieldArray, Field } from "formik";
import { workExp } from "../resume/interfaces/forminterfaces";
import { CInput, CSelect, CTextArea } from "./customprimitives";
import { useContext } from "react";

interface workExProps {
  values: workExp[];
  handleChange: any;
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WorkHistoryForm: React.FC<{
  workEx: workExp;
  handleChange: any;
  index: number;
  removeFn: any;
}> = ({ workEx, handleChange, index, removeFn }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="semibold">
            {workEx.company
              ? `${workEx.company}   ${workEx.fromYear} to ${workEx.toYear}`
              : `Enter details`}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} px={0} border="none">
        <Flex p="2" marginBottom="2">
          <Box flex="1">
            <CInput
              name={`workExperience.${index}.company`}
              type="text"
              placeholder="compname"
              label="Company"
            />
            <CInput
              name={`workExperience.${index}.role`}
              type="text"
              placeholder="Role"
              label="Role"
            />
            {/* //From and to Month and year */}
            <HStack spacing="36px">
              <div>
                <FormLabel>From</FormLabel>
                <HStack spacing="24px" align="stretch">
                  <Box w="50%" bg="">
                    <FormLabel>Month</FormLabel>
                    <CSelect
                      name={`workExperience.${index}.fromMonth`}
                      type="select"
                      label=""
                    >
                      {months.map((m, i) => (
                        <option key={i} value={m}>
                          {m}
                        </option>
                      ))}
                    </CSelect>
                  </Box>
                  <Box w="50%" bg="">
                    <CInput
                      name={`workExperience.${index}.fromYear`}
                      type="text"
                      placeholder="Year"
                      label="Year"
                    />
                  </Box>
                </HStack>
              </div>
              <div>
                <FormLabel>To</FormLabel>
                <HStack spacing="24px" align="stretch">
                  <Box w="50%" bg="">
                    <FormLabel>Month</FormLabel>
                    <CSelect
                      name={`workExperience.${index}.toMonth`}
                      type="select"
                      label=""
                    >
                      {months.map((m, i) => (
                        <option key={i} value={m}>
                          {m}
                        </option>
                      ))}
                    </CSelect>
                  </Box>
                  <Box w="50%" bg="">
                    <CInput
                      name={`workExperience.${index}.toYear`}
                      type="text"
                      placeholder="Year"
                      label="Year"
                    />
                  </Box>
                </HStack>
              </div>
            </HStack>
            <CTextArea
              name={`workExperience.${index}.jobdescription`}
              type="text"
              placeholder="Description"
              label="Job Description"
            />
          </Box>
          <button onClick={() => removeFn(index)}>X</button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

const WorkHistory: React.FC<workExProps> = ({ values, handleChange }) => {
  console.log(values);
  return (
    <FieldArray name="workExperience">
      {(arrayHelpers) => (
        <Accordion allowToggle>
          {values.map((workEx, index) => (
            <WorkHistoryForm
              key={index}
              workEx={workEx}
              handleChange={handleChange}
              index={index}
              removeFn={arrayHelpers.remove}
            />
          ))}
          <Button
            type="button"
            colorScheme="pink"
            variant="solid"
            onClick={() =>
              arrayHelpers.push({
                company: "",
                fromYear: "",
                toYear: "",
                role: "",
              })
            }
          >
            +
          </Button>
        </Accordion>
      )}
    </FieldArray>
  );
};

export default React.memo(WorkHistory);
