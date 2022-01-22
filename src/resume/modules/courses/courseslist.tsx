import { DeleteIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, Flex, Grid, Icon
} from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { VscGrabber } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import { ICourse } from "../../interfaces/forminterfaces";
import { deleteCourse, setAllCourses } from "./reducers";

const ProjectsUnit = (
  { course }: { course: ICourse; index: number }
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
      <Grid placeItems="center" height="40px" width="40px">
        <DeleteIcon
          color="red.500"
          cursor="pointer"
          m={1}
          onClick={() => {
            dispatch(deleteCourse(course.id));
            dispatch(setDirty({ isDirty: true }));
          }}
        />
      </Grid>
    </Flex>
  );
};

export default function CoursesList({ ...props }: any) {
  const courses = useAppSelector((state) => state.courses.list || []);
  const dispatch = useAppDispatch();

  return (
    <Box as="article" {...props}>
      {(!courses || courses.length === 0) && `No courses found.`}
      {courses && courses.length > 0 && (
        <DragDropContext
          onDragEnd={(params) => {
            const srcI = params.source.index;
            const destI = params.destination?.index || 0;
            const newList = [...courses];
            newList.splice(destI, 0, newList.splice(srcI, 1)[0]);
            dispatch(setAllCourses(newList));
            if (srcI !== destI) {
              dispatch(setDirty({ isDirty: true }));
            }
          }}
        >
          <Droppable droppableId="workexdroppable">
            {(provided) => (
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
                        {(provided) => (
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
