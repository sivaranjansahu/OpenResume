import { DeleteIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import { ILink } from "../../interfaces/forminterfaces";
import { deleteLink } from "./reducers";



const LinkUnit = ({ link }: { link: ILink; index: number }) => {
  //const { removeSkill } = useContext(SkillsContext);
  const dispatch = useAppDispatch();
  return (
    <Tr>
      <Td px={0}>{link.title}</Td>
      <Td px={0}>{link.url}</Td>
      <Td px={0} textAlign="right">
        <DeleteIcon
          onClick={() => {
            dispatch(deleteLink(link.id));
            dispatch(setDirty({ isDirty: true }));
          }}
          cursor="pointer"
          color="red.400"
          boxSize={4}
          mr={1}
        />
      </Td>
    </Tr>
  );
};

export default function LinksList({ ...props }: any) {
  const links = useAppSelector((state) => state.links.list || []);


  return (
    <Box as="article" {...props}>
      {(!links || links.length === 0) && `No links found.`}
      {links && links.length > 0 && (
        <Table variant="simple" size="sm" mb={8}>
          <Thead>
            <Tr>
              <Th px={0} pb={4}>
                Title
              </Th>
              <Th px={0} pb={4}>
                URL
              </Th>

              <Th px={0} pb={4}></Th>
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
