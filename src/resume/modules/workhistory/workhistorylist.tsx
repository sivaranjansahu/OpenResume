import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Heading } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  forwardRef,
  Text,
  Icon,
} from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { VscGrabber } from "react-icons/vsc";
import { IoReorderThree } from "react-icons/io5";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { IWorkHistory } from "../../interfaces/forminterfaces";
import { removeWorkHistory, setAllWorkHistory } from "./reducers";
import { setDirty } from "../../../store/store";

interface props {}
//{ exp }: { exp: IWorkHistory,ref:HTMLElement | null | undefined },ref
const WorkHistoryUnit = forwardRef(
  ({ exp }: { exp: IWorkHistory }, ref: any) => {
    const dispatch = useAppDispatch();
    return (
      <Flex alignItems="flex-start" ref={ref}>
        <AccordionItem flex={1}>
          <h2>
            <AccordionButton px={0} border="none">
              <Box flex="1" textAlign="left">
                {exp.jobTitle}, {exp.employedIn}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel py={4} px={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading as="h6" fontWeight="bold" size="sm">
                {exp.employedIn}
              </Heading>
              <Text fontSize="sm">
                From {exp.fromMonth + " " + exp.fromYear}
                {!exp.isCurrent
                  ? ` to ${exp.toMonth} ${exp.toYear}`
                  : " to present"}
              </Text>
            </Flex>
            <Box p={4}>
              <ul>
                {exp.jobDescription
                  .split("|")
                  .map((line: any, index: number) => {
                    return <li key={index}>{line}</li>;
                  })}
              </ul>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <DeleteIcon
          color="red.400"
          cursor="pointer"
          boxSize={4}
          mr={1}
          mt={3}
          ml={3}
          onClick={() => {
            dispatch(removeWorkHistory(exp.id));
            dispatch(setDirty({ isDirty: true }));
          }}
        />
      </Flex>
    );
  }
);

const WorkHistoryList = ({ ...props }: any) => {
  const workHistory = useAppSelector((state) => state.workHistory.list);
  const dispatch = useAppDispatch();

  return (
    <Box as="article" {...props}>
      {(!workHistory || workHistory.length === 0) && (
        <Text fontSize="sm" colorScheme="blackAlpha">
          No work history found. Add one by clicking the button on the right.
        </Text>
      )}
      {workHistory && (
        <DragDropContext
          onDragEnd={(params) => {
            const srcI = params.source.index;
            const destI = params.destination?.index || 0;
            let newList = [...workHistory];
            newList.splice(destI, 0, newList.splice(srcI, 1)[0]);
            dispatch(setAllWorkHistory(newList));
            if (srcI !== destI) {
              dispatch(setDirty({ isDirty: true }));
            }
          }}
        >
          <Droppable droppableId="workexdroppable">
            {(provided, snapshot) => (
              <Accordion
                allowToggle
                allowMultiple
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {workHistory.map((exp: IWorkHistory, index: number) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={`drag${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Flex
                          alignItems="flex-start"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Box {...provided.dragHandleProps} pt={2} pr={6}>
                            <Icon
                              as={IoReorderThree}
                              boxSize={6}
                              color="gray.500"
                            />
                          </Box>
                          <Box flex={1}>
                            <WorkHistoryUnit key={index} exp={exp} />
                          </Box>
                        </Flex>
                      )}
                    </Draggable>
                  );
                })}
              </Accordion>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
  );
};

export default WorkHistoryList;
