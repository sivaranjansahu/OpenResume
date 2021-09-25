import React, { useEffect } from "react";
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
import WorkHistoryView from "./modules/workhistory/resumeview";
import BasicInfoView, { Contactview } from "./modules/basicinfo/resumeview";
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
  accent: "#3182CE",
  body: "#111",
  heading: "#3182CE",
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
    color: colors.heading,
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
  const { state, accentColor } = props;
  const { skills, workHistory, education, basicInfo } = state;
  styles.blockHeader.color = accentColor;
  // useEffect(() => {
  //   styles.blockHeader.color = accentColor;
  //   console.log("selected color", accentColor);
  // }, [accentColor]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.main}>
            <BasicInfoView info={state.basicInfo.info} styles={styles} />
            {/* <View style={styles.contentblock}>
              <Text style={styles.h2}>{state.meta.profileName}</Text>
              <Text style={styles.h4}>Senior Designer, Microsoft</Text>
            </View> */}
            {/* Skills */}

            <SkillsView
              skills={state.skills.list}
              active={state.skills.active}
              styles={styles}
            />
            {/* Workex */}

            <WorkHistoryView
              history={state.workHistory.list}
              active={state.workHistory.active}
              styles={{
                ...styles,
                jobTitle: {
                  fontWeight: "semibold",
                },
                companyName: {
                  color: colors.accent,
                  fontSize: 8,
                  fontWeight: "normal",
                },
              }}
            />

            {/* Education */}
            <View style={styles.contentblock}>
              <Text style={{ ...styles.h3, ...styles.blockHeader }}>
                Education
              </Text>
              <View style={styles.subsection}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.subBlockHeader}>
                      Masters <Text>CalTech</Text>
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
                      Bachelor of Engineering <Text>IIT</Text>
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
          {/* <Contactview info={state.basicInfo.info} styles={styles} /> */}
          {/* <View style={styles.contentblock}>
            <Text style={{ ...styles.h4, ...styles.blockHeader }}>Contact</Text>
            <Text style={styles.sm}>sivaranjan.sahu@gmail.com</Text>
            <Text style={styles.sm}>Issaquah,WA</Text>
            <Text style={styles.sm}>+1 425-588-6161</Text>
          </View> */}

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

export default MyDocument;
