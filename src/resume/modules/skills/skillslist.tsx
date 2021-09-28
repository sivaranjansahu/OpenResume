import { DeleteIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import {
  Table,
  Tbody,
  Td, Th, Thead,
  Tr,Grid
} from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { ISkill } from "../../interfaces/forminterfaces";
import { removeSkill } from "./reducers";

const levels:any = {
  "1":"Beginner",
  "2":"Intermediate",
  "3":"Expert"
}

const SkillUnit = ({ skill, index }: { skill: ISkill; index: number }) => {
  //const { removeSkill } = useContext(SkillsContext);
  const dispatch = useAppDispatch();
  return (
    <Tr>
      <Td px={0}>{skill.skillName}</Td>
      <Td px={0}>{skill.skillYearsExperience}</Td>
      <Td px={0}>{levels[skill.skillLevel.toString()]}</Td>
      <Td px={0} textAlign="right">
        <DeleteIcon
          onClick={() => dispatch(removeSkill(skill.id))}
          cursor="pointer"
          color="red.400"
          boxSize={4}
          mr={1}
        />
        
      </Td>
    </Tr>
  );
};

export default function SkillsList() {
  const skills = useAppSelector((state) => state.skills.list || []);
  const dispatch = useAppDispatch();

  return (
    <Box as="article" px={8}>
      {(!skills || skills.length === 0) && `No skills found.`}
      {skills && skills.length > 0 && (
        <Table variant="simple" size="sm" mb={8}>
          <Thead>
            <Tr>
              <Th px={0} pb={4}>
                Skill
              </Th>
              <Th  px={0} pb={4}>
                Years
              </Th>
              <Th  px={0} pb={4}>
                Proficiency
              </Th>
              <Th  px={0} pb={4}>
                
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <TransitionGroup component={null}>
              {skills &&
                skills?.map((s: ISkill, i) => {
                  return (
                    <CSSTransition key={i} timeout={500} classNames="listitem">
                      <SkillUnit skill={s} key={i} index={i} />
                    </CSSTransition>
                  );
                })}
            </TransitionGroup>
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
