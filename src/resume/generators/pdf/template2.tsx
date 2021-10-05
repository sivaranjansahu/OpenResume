import {
    Document,
    Font, Page,
    PDFViewer, StyleSheet, Text,
    View
} from "@react-pdf/renderer";
import BasicInfoView from "../../modules/basicinfo/resumeview";
import SkillsView from "../../modules/skills/resumeview";
import WorkHistoryView from "../../modules/workhistory/resumeview";
import styleGen from './basestyles';
import InterBold from "../../../fonts/Inter/Inter-Bold.ttf";
import InterMedium from "../../../fonts/Inter/Inter-Medium.ttf";
import InterRegular from "../../../fonts/Inter/Inter-Regular.ttf"; 
// Font.register({
//   family: "VisbyCF",
//   fonts: [
//     { src: InterRegular, fontWeight: 400 },
//     { src: InterMedium, fontWeight: 500 },
//     { src: InterBold, fontWeight: 700 },
//   ],
// });

 function Template2(props:any){
  const styles = styleGen({
    fontFamily:"quicksand",
    accentColor:"#ffbb00"
  })
    const { state, accentColor } = props;
  const { skills, workHistory, education, basicInfo } = state;

    return(
        <Page size="A4" style={styles.page}>
        {/* Right column */}
        <View style={styles.aside}>
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
      
        
        {/* Left column */}
        <View style={styles.section}>
          <View style={styles.main}>
            <BasicInfoView info={state.basicInfo.info} styles={styles} />

            {/* Skills */}
            <SkillsView 
            state={state.skills}
              styles={styles}
            />

            {/* Workex */}
            <WorkHistoryView
              // history={state.workHistory.list}
              // active={state.workHistory.active}
              state={state.workHistory}
              styles={{
                ...styles,
                jobTitle: {
                  fontWeight: "semibold",
                },
                companyName: {
                  //color: colors.accent,
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

                {/* <UL style={{}}>
                  <LI>
                    <Text>
                      Designed and developed a multilayered solution to generate
                      synthetic medical pill images from seed images. ThreeJS,
                      NodeJS, Blender, React
                    </Text>
                  </LI>
                </UL> */}
              </View>
              
            </View>
          </View>
        </View>
        </Page>
    )
}

export default Template2;