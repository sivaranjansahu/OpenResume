import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Heading } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { IWorkHistory } from "../../interfaces/forminterfaces";
import { removeWorkHistory } from "./reducers";

const WorkHistoryUnit = ({ exp }: { exp: IWorkHistory }) => {
  const dispatch = useAppDispatch();
  return (
    <Flex alignItems="flex-start">
      <AccordionItem flex={1}>
        <h2>
          <AccordionButton px={0}>
            <Box flex="1" textAlign="left">
              {exp.jobTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          <h2>{exp.employedIn}</h2>
          <span>
            From {exp.fromMonth + " " + exp.fromYear} to{" "}
            {exp.toMonth + " " + exp.toYear}
          </span>
        </AccordionPanel>
      </AccordionItem>
      <Grid placeItems="center" height="40px" width="40px">
        <DeleteIcon
          color="red.500"
          cursor="pointer"
          m={1}
          onClick={() => dispatch(removeWorkHistory(exp.id))}
        />
      </Grid>
    </Flex>

    // <Box as="article" borderBottomWidth={1} pb={4}>
    //   <Heading size="lg">{exp.jobTitle}</Heading>
    //   <h2>{exp.employedIn}</h2>
    //   <span>
    //     From {exp.fromMonth + " " + exp.fromYear} to{" "}
    //     {exp.toMonth + " " + exp.toYear}
    //   </span>
    //   <DeleteIcon onClick={() => dispatch(removeWorkHistory(exp.id))} />
    // </Box>
  );
};

const WorkHistoryList = () => {
  const workHistory = useAppSelector((state) => state.workHistory.list);
  return (
    <Box as="article" px={8}>
      {(!workHistory || workHistory.length === 0) && (
        <Text fontSize="sm" colorScheme="blackAlpha">
          No work history found. Add one by clicking the button on the right.
        </Text>
      )}
      {workHistory && (
        <Accordion allowToggle allowMultiple>
          <TransitionGroup component={null}>
            {workHistory.map((exp: IWorkHistory, index: number) => {
              return (
                <CSSTransition key={index} timeout={500} classNames="listitem">
                  <WorkHistoryUnit key={index} exp={exp} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </Accordion>
      )}
    </Box>
  );
};

export default WorkHistoryList;
