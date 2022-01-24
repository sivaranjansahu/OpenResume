import { Button, Flex, Input, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { VscClose, VscEdit } from "react-icons/vsc";
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

function RenameSection({ setAltName, sectionName }: propType) {
  const dispatch = useAppDispatch();
  const altName = useAppSelector((state) => state[sectionName].altName);
  const [isRenameActive, setRenameActive] = useState(false);
  useEffect(() => {
    console.log("altName", altName);
    setRenameActive(altName && altName.length > 0 ? true : false);
  }, [altName]);

  return (
    <Flex alignItems="center" justifyContent="flex-end" mr={2}>
      {isRenameActive && (
        <Input
          width="200px"
          mr={2}
          placeholder="Rename this section"
          id={"newName" + sectionName}
          size="xs"
          defaultValue={altName}
          onChange={(e) => {
            e.target.value.length > 0 && dispatch(setAltName(e.target.value));
            dispatch(setDirty({ isDirty: true }));
          }}
        />
      )}

      {!isRenameActive && (
        <Tooltip
          size="sm"
          placement="top"
          label="Rename section. You can choose a different name for this section to appear on the resume. "
        >
          <Button
            leftIcon={<VscEdit />}
            size="sm"
            onClick={() => setRenameActive(!isRenameActive)}
          />
        </Tooltip>
      )}
      {isRenameActive && (
        <Tooltip
          size="sm"
          placement="top"
          label="Reset section name to default"
        >
          <Button
            leftIcon={<VscClose />}
            size="sm"
            onClick={() => {
              if (altName && altName?.length > 0) {
                dispatch(setAltName(""));
                dispatch(setDirty({ isDirty: true }));
              }

              setRenameActive(!isRenameActive);
            }}
          />
        </Tooltip>
      )}
    </Flex>
  );
}

export default RenameSection;
