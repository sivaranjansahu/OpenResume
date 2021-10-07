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
  Grid,
} from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { ILink, IProject } from "../../interfaces/forminterfaces";
import { deleteProject, setAllProjects } from "./reducers";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { VscGrabber } from "react-icons/vsc";
import { setDirty } from "../../../store/store";

const ProjectsUnit = (
  { project, index }: { project: IProject; index: number },
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
              {project.title}, {project.year}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          {project.about}
        </AccordionPanel>
      </AccordionItem>
      <Grid placeItems="center" height="40px" width="40px">
        <DeleteIcon
          color="red.500"
          cursor="pointer"
          m={1}
          onClick={() => {
            dispatch(deleteProject(project.id));
            dispatch(setDirty({ isDirty: true }));
          }}
        />
      </Grid>
    </Flex>
  );
};

export default function ProjectsList({ ...props }: any) {
  const projects = useAppSelector((state) => state.projects.list || []);
  const dispatch = useAppDispatch();

  return (
    <Box as="article" {...props}>
      {(!projects || projects.length === 0) && `No projects found.`}
      {projects && projects.length > 0 && (
        <DragDropContext
          onDragEnd={(params) => {
            const srcI = params.source.index;
            const destI = params.destination?.index || 0;
            let newList = [...projects];
            newList.splice(destI, 0, newList.splice(srcI, 1)[0]);
            dispatch(setAllProjects(newList));
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
                {projects &&
                  projects?.map((s: IProject, index: number) => {
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
                                project={s}
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
