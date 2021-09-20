import { Button } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, VStack } from "@chakra-ui/layout";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";

import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useContext, useEffect } from "react";
import { ISkill } from "../../interfaces/forminterfaces";
import { SkillsContext } from "../../profilebuilder";
import { addSkill, removeSkill } from "./reducers";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";

const SkillUnit = ({ skill, index }: { skill: ISkill; index: number }) => {
  //const { removeSkill } = useContext(SkillsContext);
  const dispatch = useAppDispatch();
  return (
    <Tr>
      <Td px={0}>{skill.skillName}</Td>
      <Td px={0}>{skill.skillYearsExperience}</Td>
      <Td px={0}>{skill.skillLevel}</Td>
      <Td px={0}>
        <DeleteIcon
          onClick={() => dispatch(removeSkill(skill.id))}
          cursor="pointer"
          color="red.400"
        />
        {/* <Button onClick={() => removeSkill && removeSkill(skill.id)}>
          Delete
        </Button> */}
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
        <Table variant="simple" size="sm" mb={16}>
          <Thead>
            <Tr>
              <Th p={0} pb={4}>
                Skill
              </Th>
              <Th p={0} pb={4}>
                Years
              </Th>
              <Th p={0} pb={4}>
                Proficiency
              </Th>
              <Th p={0} pb={4}>
                Delete
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
