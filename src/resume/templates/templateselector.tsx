import { Box, Heading } from "@chakra-ui/layout";
import { IProfile } from "../interfaces/forminterfaces";
import Template1 from "./template1";
import Template2 from "./template2";
type templateType = {
    [key: string]: any
}

const templates:templateType = {
    "temp1": Template1,
    "temp2": Template2
};

export default function Template({resumeData,id}:{resumeData:IProfile, id:any}){
    const TemplateComponent = templates[id];
    return(
        <TemplateComponent resumeData={resumeData}/>
            
       
    )
}