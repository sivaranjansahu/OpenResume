import { DeleteIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  forwardRef,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { ICourse, ILink, IProject } from "../../interfaces/forminterfaces";
import { deleteCourse, setAllCourses } from "./reducers";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { VscGrabber } from "react-icons/vsc";

const ProjectsUnit = (
  { course, index }: { course: ICourse; index: number },
  ref: any
) => {
  //const { removeSkill } = useContext(SkillsContext);
  const dispatch = useAppDispatch();
  return (
    <Flex alignItems="flex-start">
      <AccordionItem flex={1}>
        <h2>
          <AccordionButton px={0}>
            <Box flex="1" textAlign="left">
              {course.title}, {course.year}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          {course.institute}
        </AccordionPanel>
      </AccordionItem>
    </Flex>
  );
};

export default function CoursesList() {
  const courses = useAppSelector((state) => state.courses.list || []);
  const dispatch = useAppDispatch();

  return (
    <Box as="article" px={8}>
      {(!courses || courses.length === 0) && `No projects found.`}
      {courses && courses.length > 0 && (
        <DragDropContext
          onDragEnd={(params) => {
            const srcI = params.source.index;
            const destI = params.destination?.index || 0;
            let newList = [...courses];
            newList.splice(destI, 0, newList.splice(srcI, 1)[0]);
            dispatch(setAllCourses(newList));
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
                {courses &&
                  courses?.map((course: ICourse, index: number) => {
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
                            <Box {...provided.dragHandleProps} pt={2} pr={2}>
                              <Icon as={VscGrabber} boxSize={4} />
                            </Box>
                            <Box flex={1}>
                              <ProjectsUnit
                                course={course}
                                key={index}
                                index={index}
                              />
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
}
