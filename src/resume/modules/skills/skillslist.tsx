import { DeleteIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import Grabber from "../../components/grabber";
import { ISkill } from "../../interfaces/forminterfaces";
import { removeSkill, setAllSkills } from "./reducers";

const levels: any = {
  "1": "Beginner",
  "2": "Intermediate",
  "3": "Expert",
};


export default function SkillsList({ ...props }: any) {
  const skills = useAppSelector((state) => state.skills.list || []);
  const dispatch = useAppDispatch();

  return (
    <Box as="article" {...props}>
      {(!skills || skills.length === 0) && `No skills found.`}
      {skills && skills.length > 0 && (
        <DragDropContext
          onDragEnd={(params) => {
            console.log(params);
            const srcI = params.source.index;
            const destI = params.destination?.index || 0;
            const newList = [...skills];
            newList.splice(destI, 0, newList.splice(srcI, 1)[0]);
            //setList(newList);
            dispatch(setAllSkills(newList));
            if (srcI !== destI) {
              dispatch(setDirty({ isDirty: true }));
            }
          }}
        >
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th px={0} pb={4} pr={2} width={6}></Th>
                <Th px={0} pb={4}>
                  Skill
                </Th>
                <Th px={0} pb={4}>
                  Proficiency
                </Th>
                <Th px={0} pb={4}></Th>
              </Tr>
            </Thead>
            <Droppable droppableId="skillsdroppable">
              {(provided) => (
                <Tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {skills &&
                    skills?.map((skill: ISkill, i) => {
                      return (
                        <Draggable key={i} draggableId={`drag${i}`} index={i}>
                          {(provided) => (
                            <Tr
                              width="100%"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <Td
                                px={0}
                                {...provided.dragHandleProps}
                                width="5%"
                              >
                                <Grabber />
                              
                              </Td>
                              <Td px={0} width="50%">
                                {skill.skillName}
                              </Td>

                              <Td px={0} width="40%">
                                {levels[skill.skillLevel.toString()]}
                              </Td>
                              <Td px={0} textAlign="right">
                                <DeleteIcon
                                  onClick={() => {
                                    dispatch(removeSkill(skill.id));
                                    dispatch(setDirty({ isDirty: true }));
                                  }}
                                  cursor="pointer"
                                  color="red.400"
                                  boxSize={4}
                                  mr={1}
                                />
                              </Td>
                            </Tr>
                          )}
                        </Draggable>
                      );
                    })}
                </Tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      )}
    </Box>
  );
}
