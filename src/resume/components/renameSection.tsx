import { Flex,Box, Checkbox, Input, FormLabel, Icon, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { VscQuestion } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../store/reduxhooks";
import { setDirty } from "../../store/store";

type propType = {
    setAltName: Function;
  sectionName:
    | "education"
    | "projects"
    | "basicInfo"
    | "summary"
    | "skills"
    | "links"
    | "workHistory"
    | "courses";
};

function RenameSection({ setAltName, sectionName }: propType){
    const dispatch = useAppDispatch();
    const altName = useAppSelector((state) => state[sectionName].altName);
    console.log('section '+sectionName+altName)
    const [isRenameActive,setRenameActive] = useState(false);
    useEffect(() => {
        setRenameActive(!!altName)
    }, [altName])
    
    return(
        <Flex mb={4} alignItems="center" justifyContent="flex-end">
            
          <Input width="250px" mr={2}  placeholder="Section name to appear on resume" id={"newName"+sectionName} size="xs"  defaultValue={altName} onChange={(e)=>{
              dispatch(setAltName(e.target.value))
              dispatch(setDirty({ isDirty: true }))
          }} />
          
          <Tooltip placement="top" label="Use this field to specify how this section appears on the resume. E.g., you could choose a section name like 'Recent works' instead of the default name like 'Projects'">
          <Box>
          <Icon as={VscQuestion} boxSize={4}/>
          </Box>
  </Tooltip>
          
          
     
          
          </Flex>
    )

}

export default RenameSection;