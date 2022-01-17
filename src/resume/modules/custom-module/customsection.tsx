import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { useAppDispatch } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import AccordionUnit from "../../components/accordionunit";
import { ICustomSection } from "../../interfaces/forminterfaces";
import { deleteCustomSection } from "./reducers";

type propsTypes = {
  sectionData: ICustomSection;
};

export default function CustomSection(props: propsTypes) {
  const { sectionData } = props;
  const dispatch = useAppDispatch();

  function deleteSection(uuid: string) {
    dispatch(deleteCustomSection({ customSectionId: uuid }));
    dispatch(setDirty({ isDirty: true }));
  }
  return (
    <Flex bg="white" px={4} mb={2}>
      <Box display="flex" alignItems="flex-start">
        <Box w="72px" paddingTop={3} display="flex">
          <Box w="2rem"/>
          <Box flex={1} justifyContent="center">
        <DeleteIcon
            color="red.500"
            cursor="pointer"
            m={1}
            onClick={() => deleteSection(sectionData.guid)}
          />
          </Box>
        </Box>
        
      </Box>
      <Box flex={1}>
        <AccordionUnit title={sectionData.title}>
          <Flex
            mb={4}
            alignItems="center"
            justifyContent="space-between"
          ></Flex>
          {sectionData.guid}
          {sectionData.content}
        </AccordionUnit>
      </Box>
    </Flex>
  );
}
