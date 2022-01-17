import { Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { IProfile } from "../../../interfaces/forminterfaces";
import CourseView from "../../../modules/courses/resumeview";
import EducationView from "../../../modules/education/resumeview";
import LinkView from "../../../modules/links/resumeview";
import ProjectView from "../../../modules/projects/resumeview";
import SkillsView from "../../../modules/skills/resumeview";
import SummaryView from "../../../modules/summary/summaryview";
import WorkHistoryView from "../../../modules/workhistory/resumeview";
import styleGen from "../basestyles";
type propType = {
  state: IProfile;
  headingFont: string;
  headingDesign:number;
  bodyFont:string;
  accentColor: string;
  bodyColor?:string;
};

export default function Template1(props: propType) {
  const styles = styleGen({
    headingFont: props.headingFont,
    bodyFont:props.bodyFont,
    accentColor: props.accentColor,
    
  });

  styles.page={
    ...styles.page,
    backgroundColor:props.bodyColor
  }
  styles.section = {
    ...styles.section,
    //marginBottom:6,
    //marginBottom:10
  }
  styles.subSectionContainer = {
    marginTop:6
  }
  styles.sectionHeader = {
    ...styles.sectionHeader,
    marginBottom:2,
    //textTransform: "uppercase",
  };
  styles.subSectionHeader = {
    ...styles.subSectionHeader,
    fontWeight:500,
    //textTransform:"uppercase"
    fontStyle:"italic"
  };
  

  const templateStyles =StyleSheet.create( {
    container:{
      flexDirection:"row",
      paddingLeft:"4vw",
      paddingRight:"4vw",
      marginBottom:"2vw",
      width:"100vw",
      
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

  const { state, accentColor,bodyColor,headingDesign } = props;
  const { componentOrder } = state;
  console.log("resumeData", componentOrder);
  return (
    <Page size="A4" style={styles.page} >
      <View style={templateStyles.container}>
        <View  style={templateStyles.main}>
        <Text style={[styles.heading1,{fontSize:24,fontWeight:500,textTransform:"uppercase"}]}>{state.basicInfo.info.fullName}</Text>
        <Text >Design Technologist, Innovator @ Microsoft Research, UX Engineer, Designer who codes.</Text>
        </View>
        <View  style={[templateStyles.aside,styles.tiny]}>
        <Text >{state.basicInfo.info.address}</Text>
        <Text >{state.basicInfo.info.phoneno}</Text>
        <Text >{state.basicInfo.info.email}</Text>
        </View>
      </View>
      <View style={templateStyles.container}>
      {/* Left column */}
        <View style={templateStyles.main}>
          {/* <BasicInfoView info={state.basicInfo.info} styles={styles} /> */}
          
          {componentOrder?.order.map((compname, index) => {
            const sectionStyles = Object.create(styles);
            sectionStyles.accentColor = accentColor;
            sectionStyles.bodyColor = bodyColor;
            switch (compname) {
              case "skills":
                return <SkillsView headingDesign={headingDesign} state={state.skills} styles={sectionStyles}  />;
              case "workExperience":
                return (
                  <WorkHistoryView headingDesign={headingDesign} state={state.workHistory} styles={sectionStyles} />
                );
              case "summary":
                return <SummaryView headingDesign={headingDesign} summary={state.summary} styles={sectionStyles} />;
              case "education":
                return (
                  <EducationView headingDesign={headingDesign}  state={state.education} styles={sectionStyles} />
                );
              case "courses":
                return <CourseView headingDesign={headingDesign}  state={state.courses} styles={sectionStyles} />;
              case "projects":
                return <ProjectView headingDesign={headingDesign}  state={state.projects} styles={sectionStyles} />;
                case "links":
                return <LinkView headingDesign={headingDesign}  state={state.links} styles={sectionStyles} />;
              default:
                return <LinkView headingDesign={headingDesign}  state={state.links} styles={sectionStyles} />;
            }
          })}
 
        </View>
      {/* Right column */}
      <View style={templateStyles.aside}>
        <LinkView headingDesign={headingDesign} state={state.links} styles={styles} />
      </View>
      </View>
    </Page>
  );
}
