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
import {
  StyleSheet
} from "@react-pdf/renderer";
type propType = {
  state: IProfile;
  headingFont: string;
  bodyFont:string;
  accentColor: string;
};

export default function Template1(props: propType) {
  const styles = styleGen({
    headingFont: props.headingFont,
    bodyFont:props.bodyFont,
    accentColor: props.accentColor,
  });

  styles.section = {
    ...styles.section,
    marginBottom:6
  }
  styles.sectionHeader = {
    ...styles.sectionHeader,
    marginBottom:4,
    //textTransform: "uppercase",
  };
  styles.subSectionHeader = {
    ...styles.subSectionHeader,
    fontWeight:500,
    textTransform:"uppercase"
  };

  const templateStyles =StyleSheet.create( {
    container:{
      flexDirection:"row",
      padding:"4vw",
      width:"100vw",
      backgroundColor:"#F7F7F7"
    },
    main:{
      flex:1,
      width: "71vw",
      padding:"2vw"
    },
    aside:{
      width:"21vw",
      //backgroundColor:"#eaeaea",
      padding:"2vw"
    }
  })

  //styles.blockHeader = { ...styles.blockHeader, textTransform: "uppercase" };

  const { state, accentColor } = props;
  const { skills, workHistory, education, basicInfo, componentOrder } = state;
  console.log("resumeData", componentOrder);
  return (
    <Page size="A4" style={styles.page}>
      <View style={templateStyles.container}>
      {/* Left column */}
      <View style={styles.section}>
        <View style={templateStyles.main}>
          {/* <BasicInfoView info={state.basicInfo.info} styles={styles} /> */}
          <Text style={styles.heading1}>{state.basicInfo.info.fullName}</Text>
          {componentOrder?.order.map((compname, index) => {
            let Comp;
            switch (compname) {
              case "skills":
                console.log(compname);
                return <SkillsView state={state.skills} styles={styles}  />;
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

        </View>
      </View>
      {/* Right column */}
      <View style={templateStyles.aside}>
        <LinkView state={state.links} styles={styles} />
      </View>
      </View>
    </Page>
  );
}
