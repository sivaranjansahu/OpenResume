import { Box, Flex, Icon, Input, Tooltip } from "@chakra-ui/react";
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
    //console.log('section '+sectionName+altName)
    // const [isRenameActive,setRenameActive] = useState(false);
    // useEffect(() => {
    //     setRenameActive(!!altName)
    // }, [altName])
    
    return(
        <Flex alignItems="center" justifyContent="space-between">
          <Input  width="250px" mr={2}  placeholder="Rename this section" id={"newName"+sectionName} size="xs"  defaultValue={altName} onChange={(e)=>{
              dispatch(setAltName(e.target.value))
              dispatch(setDirty({ isDirty: true }))
          }} />
          
          <Tooltip size="sm" placement="top" label="Use a different title for this section on resume.E.g., you could choose a section name like 'Recent works' instead of the default name like 'Projects'">
          <Box>
          <Icon as={VscQuestion} boxSize={4}/>
          </Box>
  </Tooltip>
          </Flex>
          
    )

}

export default RenameSection;