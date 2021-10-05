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
import { ILink } from "../../interfaces/forminterfaces";
import { deleteLink } from "./reducers";

const levels:any = {
  "1":"Beginner",
  "2":"Intermediate",
  "3":"Expert"
}

const LinkUnit = ({ link, index }: { link: ILink; index: number }) => {
  //const { removeSkill } = useContext(SkillsContext);
  const dispatch = useAppDispatch();
  return (
    <Tr>
      <Td px={0}>{link.title}</Td>
      <Td px={0}>{link.url}</Td>
      <Td px={0} textAlign="right">
        <DeleteIcon
          onClick={() => dispatch(deleteLink(link.id))}
          cursor="pointer"
          color="red.400"
          boxSize={4}
          mr={1}
        />
        
      </Td>
    </Tr>
  );
};

export default function LinksList() {
  const links = useAppSelector((state) => state.links.list || []);
  const dispatch = useAppDispatch();

  return (
    <Box as="article" px={8}>
      {(!links || links.length === 0) && `No links found.`}
      {links && links.length > 0 && (
        <Table variant="simple" size="sm" mb={8}>
          <Thead>
            <Tr>
              <Th px={0} pb={4}>
                Title
              </Th>
              <Th  px={0} pb={4}>
                URL
              </Th>
              
              <Th  px={0} pb={4}>
                
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <TransitionGroup component={null}>
              {links &&
                links?.map((s: ILink, i) => {
                  return (
                    <CSSTransition key={i} timeout={500} classNames="listitem">
                      <LinkUnit link={s} key={i} index={i} />
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