import { Switch, Tooltip, Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store/reduxhooks";
import { setDirty } from "../../store/store";
 
type includeSwitchType = {
  setActive: any;
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

function IncludeSwitch({ setActive, sectionName }: includeSwitchType) {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state[sectionName].active);
  return (
    <Tooltip
      hasArrow
      label={`Include ${sectionName} section in the resume ?`}
      bg="gray.300"
      color="black"
      placement="top"
      closeOnClick={true}
    >
      <Box>
        <Switch
          colorScheme="secondary"
          name={sectionName + "IsActive"}
          isChecked={active}
          onChange={(e) => {
            dispatch(setActive(e.target.checked));
            dispatch(setDirty({ isDirty: true }));
          }}
        />
      </Box>
    </Tooltip>
  );
}

export default IncludeSwitch;
