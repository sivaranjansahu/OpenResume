import { InputGroup } from "@chakra-ui/input";
import { Button, Select } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { IProfile, ISkill } from "./interfaces/forminterfaces";
import Template1 from "./templates/template1";
import Template from "./templates/templateselector"
import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MyDocument from "./pdf";
import { useAppSelector } from "../store/reduxhooks";
import generateTestDoc from "./generators/docx/docxgen";

interface temp {
  resumeData: IProfile;
}
export default function Preview({ resumeData }: temp) {
  const [templateId,setTemplateId] = useState<string>("temp1");
  const state = useAppSelector((state) => state);
  return (
    <Box>
      <Button onClick={generateTestDoc}> Doc</Button>
      <MyDocument state={state}/>
      {/* <TransformWrapper
        initialScale={0.6}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.5}
        maxScale={2}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent>
              <Box height="840px" width="600px" backgroundColor="white">
              <Template id={templateId} resumeData={resumeData}/>
              </Box>
            </TransformComponent>
          </>
        )}
      </TransformWrapper> */}

    </Box>
  );
}
