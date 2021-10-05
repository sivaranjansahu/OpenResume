import {
    Document,
    Font, Page,
    PDFViewer, StyleSheet, Text,
    View
} from "@react-pdf/renderer";
import { IProfile } from "../../interfaces/forminterfaces";
import BasicInfoView from "../../modules/basicinfo/resumeview";
import SkillsView from "../../modules/skills/resumeview";
import WorkHistoryView from "../../modules/workhistory/resumeview";
import LinkView from "../../modules/links/resumeview"
import styleGen from './basestyles';

type propType={
  state:IProfile,
  font:string,
  accentColor:string
}

export default function Template1(props:propType){
  const styles = styleGen({
    fontFamily:props.font ,
    accentColor:props.accentColor
  })
    const { state, accentColor } = props;
  const { skills, workHistory, education, basicInfo } = state;

    return(
        <Page size="A4" style={styles.page}>
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
        {/* Right column */}
        <View style={styles.aside}>
        <LinkView state={state.links}
              styles={styles}/>
          {/* <View style={styles.contentblock}>
            <Text style={{ ...styles.h4, ...styles.blockHeader }}>Links</Text>
            <Text style={styles.sm}>https://siva.studio</Text>
            <Text style={styles.sm}>https://cryptomash.io</Text>
          </View> */}
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
    )
}