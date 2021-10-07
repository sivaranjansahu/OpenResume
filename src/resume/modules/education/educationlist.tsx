import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { DeleteIcon } from "@chakra-ui/icons";

import { Box, Flex, Grid, Heading } from "@chakra-ui/layout";
import exp from "constants";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { IEducation } from "../../interfaces/forminterfaces";
import { removeWorkHistory } from "../workhistory/reducers";
import { Accordion, Text } from "@chakra-ui/react";
import { removeEducation } from "./reducers";
import { setDirty } from "../../../store/store";

const EducationUnit = ({ ed }: { ed: IEducation }) => {
  const dispatch = useAppDispatch();
  return (
    <Flex alignItems="flex-start">
      <AccordionItem flex={1}>
        <h2>
          <AccordionButton px={0}>
            <Box flex="1" textAlign="left">
              {ed.school}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          <h2>{ed.degree}</h2>
          <span>
            From {ed.fromMonth + " " + ed.fromYear} to{" "}
            {ed.toMonth + " " + ed.toYear}
          </span>
          <Box>{ed.about}</Box>
        </AccordionPanel>
      </AccordionItem>
      <Grid placeItems="center" height="40px" width="40px">
        <DeleteIcon
          color="red.500"
          cursor="pointer"
          m={1}
          onClick={() => {
            dispatch(removeEducation(ed.id));
            dispatch(setDirty({ isDirty: true }));
          }}
        />
      </Grid>
    </Flex>
  );
};

export default function EducationList({ ...props }: any) {
  const educationList = useAppSelector((state) => state.education.list);
  return (
    <Box as="article" {...props}>
      {(!educationList || educationList.length === 0) && (
        <Text fontSize="sm" colorScheme="blackAlpha">
          No education information found. Add one by clicking the button on the
          right.
        </Text>
      )}
      {educationList && (
        <Accordion allowToggle allowMultiple>
          {educationList.map((ed: any, index: any) => {
            return <EducationUnit key={index} ed={ed} />;
          })}
        </Accordion>
      )}
    </Box>
  );
}
