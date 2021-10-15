import { Box, Heading, List } from "@chakra-ui/layout";
import { IProfile } from "../interfaces/forminterfaces";

export default function Template1({resumeData}:{resumeData:IProfile}){
    console.log('resumeData',resumeData)
    return(
        <Box p={4}>
        <Heading size="md">Skills</Heading>
        <List>
        {
            resumeData && resumeData.skills.list.map((skill,index)=>{
                return (<li key={index}>{skill.skillName} : {skill.skillLevel}</li>);
            })
        }
        </List>
        <Heading size="md">Work history</Heading>
        <List >
        {
            resumeData && resumeData.workHistory.list.map((work,index)=>{
               return( <li key={index}>{work.employedIn} : {work.jobTitle}</li>);
            })
        }
        </List>
        </Box>
    )
}