import React from "react";
import {
  pdf,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import InterBold from "../fonts/Inter/Inter-Bold.ttf";
import InterMedium from "../fonts/Inter/Inter-Medium.ttf";
import InterRegular from "../fonts/Inter/Inter-Regular.ttf";
import { useAppSelector } from "../store/reduxhooks";
import { ISkill } from "./interfaces/forminterfaces";
import SkillsView from "./modules/skills/resumeview";
// const source ='https://fonts.googleapis.com/css2?family=Pacifico&display=swap';
Font.register({
  family: "VisbyCF",
  fonts: [
    { src: InterRegular, fontWeight: 400 },
    { src: InterMedium, fontWeight: 500 },
    { src: InterBold, fontWeight: 700 },
  ],
});
const colors = {
  accent: "#4299E1",
  body: "#111",
  heading: "#444",
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "stretch",
    fontSize: 9,
    lineHeight: 1.5,
    fontFamily: "VisbyCF",
    color: colors.body,
  },

  section: {
    // margin: 10,
    padding: 10,
    // display:"flex",
    width: "75%",
    // flexGrow: 1,
    // backgroundColor:"red"
  },
  main: {
    width: "100%",
    // paddingRight: 10,
  },
  aside: {
    width: "25%",
    backgroundColor: "#ebebeb",
    padding: 10,
  },
  h1: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.heading,
    // fontFamily: 'Pacifico'
  },
  h2: {
    fontSize: 15,
    fontWeight: 500,
    color: "#444",
  },
  h3: {
    fontSize: 12,
    fontWeight: 500,
    color: "#444",
    width: "100%",
  },
  h4: {
    fontSize: 9,
    fontWeight: 700,
    color: "#444",
  },
  sm: {
    fontSize: 8,
    color: colors.body,
  },
  contentblock: {
    marginBottom: 16,
  },
  subsection: {
    marginBottom: 8,
  },
  blockHeader: {
    borderBottom: "0.2px solid #888",
    paddingBottom: 4,
    marginBottom: 8,
    // width: "100%",
  },
  subBlockHeader: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.heading,
    marginBottom: 4,
  },
  listBlock: {
    paddingLeft: 10,
    paddingRight: 16,
    // paddinGright:"50px"
  },
  listItem: {
    marginBottom: 4,
    flexDirection: "row",
  },
  expHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  //   italic:{
  //       textStyle:"italic"
  //   }
});

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

async function getProps() {
  await delay(1_000);
  return {
    someString: "You waited 1 second for this",
  };
}

const LazyDownloadPDFButton = () => (
  <button
    onClick={async () => {
      const props = await getProps();
      const doc = <MyDocument {...props} />;
      const asPdf = pdf(); // {} is important, throws without an argument
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      saveAs(blob, "document.pdf");
    }}
  >
    Download PDF
  </button>
);

const Bullet = () => {
  return (
    <View
      style={{
        width: 4,
        height: 4,
        backgroundColor: colors.accent,
        marginRight: 8,
        borderRadius: "50%",
        marginTop: 3,
      }}
    ></View>
  );
};
const UL = ({ children, ...props }: any) => {
  return (
    <View {...props} style={styles.listBlock}>
      <View>{children}</View>
    </View>
  );
};
const LI = ({ children, ...props }: any) => {
  return (
    <View {...props} style={styles.listItem}>
      <Bullet />
      <View>{children}</View>
    </View>
  );
};

// Create Document Component
const MyDocument = (props: any) => {
  const { state } = props;
  const { skills, workHistory, education } = state;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.main}>
            <View style={styles.contentblock}>
              <Text style={styles.h1}>{state.meta.profileName}</Text>
              <Text style={styles.h4}>Senior Designer, Microsoft</Text>
            </View>
            {/* Skills */}
            <View style={styles.contentblock}>
              <Text style={{ ...styles.h3, ...styles.blockHeader }}>
                Skills
              </Text>
              <SkillsView skills={state.skills.list} />
              {/* <View style={{ flexDirection: "row" }}>
                <View style={{ flexGrow: 1, paddingRight: 10 }} debug={false}>
                  <Text style={{ ...styles.sm, fontWeight: "bold" }}>
                    Proficient
                  </Text>
                  <Text style={{ width: "30%" }}>
                    {skills &&
                      skills.list
                        .filter((d: ISkill) => d.skillLevel == 3)
                        .map((skill: any, i: number) => {
                          return <>{skill.skillName},</>;
                        })}
                  </Text>
                </View>
                <View style={{ flexGrow: 1, marginRight: 10 }}>
                  <Text style={{ ...styles.sm, fontWeight: "bold" }}>
                    Intermediate
                  </Text>
                  <Text style={{ width: "30%" }}>
                    JavaScript, React, JavaScript, React,JavaScript, React,
                  </Text>
                </View>
                <View style={{ flexGrow: 1 }}>
                  <Text style={{ ...styles.sm, fontWeight: "bold" }}>
                    Beginner
                  </Text>
                  <Text style={{ width: "30%" }}>
                    JavaScript, React, JavaScript, React,JavaScript, React,
                  </Text>
                </View>
              </View> */}
            </View>
            {/* Workex */}
            <View style={styles.contentblock}>
              <Text style={{ ...styles.h3, ...styles.blockHeader }}>
                Relevant Experience
              </Text>
              <View style={styles.subsection}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.subBlockHeader}>
                      Software Engineer{" "}
                      <Text style={{ color: "red" }}>IBM</Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sm}>Jun 2004 to Dec 2007</Text>
                  </View>
                </View>

                <UL style={{}}>
                  <LI>
                    <Text>
                      Designed and developed a multilayered solution to generate
                      synthetic medical pill images from seed images. ThreeJS,
                      NodeJS, Blender, React
                    </Text>
                  </LI>
                  <LI>
                    <Text>
                      Designed and developed a mobile app (React Native) to
                      identify prescription pills from images, leveraging the CV
                      service built by the team. The app was shown to Microsoft
                      CEO Satya Nadella and Bill Gates as part of an MSR
                      presentation.
                    </Text>
                  </LI>
                  <LI>
                    <Text>
                      The app was shown to Microsoft CEO Satya Nadella and Bill
                      Gates as part of an MSR presentation.
                    </Text>
                  </LI>
                </UL>
              </View>
              <View style={styles.subsection}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.subBlockHeader}>
                      Senior UX Consultant{" "}
                      <Text style={{ color: "red" }}>Microsoft</Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sm}>Jun 2004 to Dec 2007</Text>
                  </View>
                </View>

                <UL style={{}}>
                  <LI>
                    <Text>
                      Designed and developed a mobile app (React Native) to
                      identify prescription pills from images, leveraging the CV
                      service built by the team.
                    </Text>
                  </LI>
                  <LI>
                    <Text>
                      The app was shown to Microsoft CEO Satya Nadella and Bill
                      Gates as part of an MSR presentation.
                    </Text>
                  </LI>
                </UL>
              </View>
              <View style={styles.subsection}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={{ ...styles.subBlockHeader }}>
                      Senior Designer
                      <Text style={{ color: "red" }}> Microsoft</Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sm}>Jun 2004 to Dec 2007</Text>
                  </View>
                </View>

                <UL style={{}}>
                  <LI>
                    <Text>
                      Designed and developed a mobile app (React Native) to
                      identify prescription pills from images, leveraging the CV
                      service built by the team.
                    </Text>
                  </LI>
                  <LI>
                    <Text>
                      The app was shown to Microsoft CEO Satya Nadella and Bill
                      Gates as part of an MSR presentation.
                    </Text>
                  </LI>
                </UL>
              </View>
            </View>

            {/* Education */}
            <View style={styles.contentblock}>
              <Text style={{ ...styles.h3, ...styles.blockHeader }}>
                Education
              </Text>
              <View style={styles.subsection}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.subBlockHeader}>
                      Masters <Text style={{ color: "red" }}>CalTech</Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sm}>Jun 2004 to Dec 2007</Text>
                  </View>
                </View>

                <UL style={{}}>
                  <LI>
                    <Text>
                      Designed and developed a multilayered solution to generate
                      synthetic medical pill images from seed images. ThreeJS,
                      NodeJS, Blender, React
                    </Text>
                  </LI>
                </UL>
              </View>
              <View style={styles.subsection}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.subBlockHeader}>
                      Bachelor of Engineering{" "}
                      <Text style={{ color: "red" }}>IIT</Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sm}>Jun 2004 to Dec 2007</Text>
                  </View>
                </View>

                <UL style={{}}>
                  <LI>
                    <Text>
                      Designed and developed a mobile app (React Native)
                    </Text>
                  </LI>
                </UL>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.aside}>
          <View style={styles.contentblock}>
            <Text style={{ ...styles.h4, ...styles.blockHeader }}>Contact</Text>
            <Text style={styles.sm}>sivaranjan.sahu@gmail.com</Text>
            <Text style={styles.sm}>Issaquah,WA</Text>
            <Text style={styles.sm}>+1 425-588-6161</Text>
          </View>

          <View style={styles.contentblock}>
            <Text style={{ ...styles.h4, ...styles.blockHeader }}>Links</Text>
            <Text style={styles.sm}>https://siva.studio</Text>
            <Text style={styles.sm}>https://cryptomash.io</Text>
          </View>
          <View style={styles.contentblock}>
            <Text style={{ ...styles.h4, ...styles.blockHeader }}>
              Publications
            </Text>
            <Text style={styles.sm}>https://nature.com/pillid</Text>
          </View>
          <View style={styles.contentblock}>
            <Text style={{ ...styles.h4, ...styles.blockHeader }}>Awards</Text>
            <Text style={styles.sm}>
              Best Innovator Award 2016, Microsoft Services
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const PDFView = (props: any) => {
  console.log(props);
  return (
    <>
      {/* <LazyDownloadPDFButton /> */}
      <PDFViewer width="100%" height="900px" showToolbar={true}>
        <MyDocument name="siva" state={props.state} />
      </PDFViewer>
    </>
  );
};

export default PDFView;
