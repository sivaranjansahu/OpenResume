import {
  Document
} from "@react-pdf/renderer";
import React from "react";
import Template1 from "./templates/template1";
import Template2 from "./templates/template2";


type templateType = {
  [key: string]: any;
};

const templates: templateType = {
  template1: Template1,
  template2: Template2,
  template3: Template1,
};

//const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));



// Create Document Component
const PDFDocument = (props: any) => {
  const {
    state,
    accentColor,
    bodyColor="#fff",
    layout = "template1",
    headingFont = "opensans",
    headingDesign,
    bodyFont="opensans",
    forceUpdate = 1,
  } = props;
  const TemplateComponent = templates[layout];

  return (
    <Document>
      <TemplateComponent
        state={state}
        bodyColor={bodyColor}
        accentColor={accentColor}
        headingFont={headingFont}
        headingDesign={headingDesign}
        bodyFont={bodyFont}
        forceUpdate={forceUpdate}
      />
    </Document>
  );
};

//export default React.memo(PDFDocument);
export default PDFDocument;
