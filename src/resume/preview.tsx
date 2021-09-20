import { Box } from "@chakra-ui/layout";
import { IProfile, ISkill } from "./interfaces/forminterfaces";

interface temp {
  resumeData: IProfile;
}
export default function Preview({ resumeData }: temp) {
  return (
    <Box height="840px" width="500px" backgroundColor="white">
      <Box h="100%" rounded="sm" p={2}>
        {resumeData &&
          resumeData.skills.list.map((skill) => {
            return <li>{skill.skillName}</li>;
          })}
      </Box>
    </Box>
  );
}
