import {
    Document,
    Font, Page,
    PDFViewer, StyleSheet, Text,
    View
} from "@react-pdf/renderer";
import React from "react";
// import InterBold from "../../../fonts/Inter/Inter-Bold.ttf";
// import InterMedium from "../../../fonts/Inter/Inter-Medium.ttf";
// import InterRegular from "../../../fonts/Inter/Inter-Regular.ttf"; 
import BasicInfoView from "../../modules/basicinfo/resumeview";
import SkillsView from "../../modules/skills/resumeview";
import WorkHistoryView from "../../modules/workhistory/resumeview";
import Template1 from "./template1";
import Template2 from "./template2";
import styles from './basestyles'
// const source ='https://fonts.googleapis.com/css2?family=Pacifico&display=swap';
// Font.register({
//   family: "VisbyCF",
//   fonts: [
//     { src: InterRegular, fontWeight: 400 },
//     { src: InterMedium, fontWeight: 500 },
//     { src: InterBold, fontWeight: 700 },
//   ],
// });

type templateType = {
  [key: string]: any
}

const templates:templateType = {
  "template1": Template1,
  "template2": Template2,
  "template3": Template1,
};


const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

async function getProps() {
  await delay(1_000);
  return {
    someString: "You waited 1 second for this",
  };
}


// Create Document Component
const PDFDocument = (props: any) => {
  const { state, accentColor,layout="template1",selectedFont="opensans" } = props;
  const { skills, workHistory, education, basicInfo } = state;
  //styles.blockHeader.color = accentColor;
  const id="template1";
  const TemplateComponent = templates[layout];
  // useEffect(() => {
  //   styles.blockHeader.color = accentColor;
  //   console.log("selected color", accentColor);
  // }, [accentColor]);
  return (
    <Document>
      <TemplateComponent state={state} accentColor={accentColor} font={selectedFont}/>
    </Document>
  );
};


export default PDFDocument;
