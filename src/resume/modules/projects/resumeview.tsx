import { Text, View } from "@react-pdf/renderer";
import { Style as PDFStyle } from "@react-pdf/types";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import SectionHeading from "../../generators/pdf/templates/headingstyles";
import { IProject } from "../../interfaces/forminterfaces";
import { LI, UL } from "../../preview/components/list";

type propsType = {
  state: {
    list: IProject[];
    active?: boolean;
  };
  styles: resumeStyleType;
  headingDesign:number
};


function ResumeView(props: propsType) {
  const { state, styles,headingDesign } = props;
  if (!state.active) {
    return null;
  }


  const projectStyles: { [key: string]: PDFStyle } = {
    title: {
      ...styles.subSectionHeader,
    },
    year: {
      ...styles.paragraph
    },
  };

  return (
    <View style={styles?.section}>
      <SectionHeading headingtype={headingDesign} title="Relevant Projects" styles={styles}/>
      {state.list.map((project: IProject, index: number) => {
        const { about } = project;
        const lines = about.split("•");
        return (
          <View style={[styles.subSectionContainer,{marginTop:index===0 ? 0 : styles.subSectionContainer.marginTop}]}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={styles.subSectionHeader} >{project.title}</Text>
            <Text style={projectStyles.year}>{project.year}</Text>
            </View>
            <View>
                <UL>
                  {lines.map((line, index) => {
                    return (
                      <LI key={index} lastItem = {index===lines.length-1}>
                        <Text>{line.trim()}</Text>
                      </LI>
                    );
                  })}
                </UL>
              </View>
          </View>
        );
      })}
    </View>
  );
}

export default ResumeView;
