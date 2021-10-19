import { Page, Text, View } from "@react-pdf/renderer";
import { IProfile } from "../../../interfaces/forminterfaces";
import BasicInfoView from "../../../modules/basicinfo/resumeview";
import LinkView from "../../../modules/links/resumeview";
import SkillsView from "../../../modules/skills/resumeview";
import SummaryView from "../../../modules/summary/summaryview";
import EducationView from "../../../modules/education/resumeview";
import WorkHistoryView from "../../../modules/workhistory/resumeview";
import CourseView from "../../../modules/courses/resumeview";
import ProjectView from "../../../modules/projects/resumeview";
import styleGen from "../basestyles";
type propType = {
  state: IProfile;
  font: string;
  accentColor: string;
};

export default function Template1(props: propType) {
  const styles = styleGen({
    fontFamily: props.font,
    accentColor: props.accentColor,
  });

  styles.sectionHeader = {
    ...styles.sectionHeader,
    textTransform: "uppercase",
  };
  styles.subSectionHeader = {
    ...styles.subSectionHeader,
    textTransform: "uppercase",
  };
  //styles.blockHeader = { ...styles.blockHeader, textTransform: "uppercase" };

  const { state, accentColor } = props;
  const { skills, workHistory, education, basicInfo, componentOrder } = state;
  console.log("resumeData", componentOrder);
  return (
    <Page size="A4" style={styles.page}>
      {/* Left column */}
      <View style={styles.section}>
        <View style={styles.main}>
          {componentOrder?.order.map((compname, index) => {
            let Comp;
            switch (compname) {
              case "skills":
                console.log(compname);
                return <SkillsView state={state.skills} styles={styles} />;
              case "workExperience":
                return (
                  <WorkHistoryView state={state.workHistory} styles={styles} />
                );
              case "summary":
                return <SummaryView summary={state.summary} styles={styles} />;
              case "education":
                return (
                  <EducationView state={state.education} styles={styles} />
                );
              case "courses":
                return <CourseView state={state.courses} styles={styles} />;
              case "projects":
                return <ProjectView state={state.projects} styles={styles} />;
                case "links":
                return <LinkView state={state.links} styles={styles} />;
              default:
                return <LinkView state={state.links} styles={styles} />;
            }
          })}
          {/* <BasicInfoView info={state.basicInfo.info} styles={styles} /> */}

          {/* Skills */}
          {/* <SkillsView state={state.skills} styles={styles} /> */}

          {/* Workex */}
          {/* <WorkHistoryView state={state.workHistory} styles={styles}/> */}

          {/* Education */}
        </View>
      </View>
      {/* Right column */}
      <View style={styles.aside}>
        <LinkView state={state.links} styles={styles} />
        {/* <View style={styles.contentblock}>
            <Text style={{ ...styles.h4, ...styles.blockHeader }}>Links</Text>
            <Text style={styles.sm}>https://siva.studio</Text>
            <Text style={styles.sm}>https://cryptomash.io</Text>
          </View> */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Publications</Text>
          <Text>https://nature.com/pillid</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Awards</Text>
          <Text>Best Innovator Award 2016, Microsoft Services</Text>
        </View>
      </View>
    </Page>
  );
}
