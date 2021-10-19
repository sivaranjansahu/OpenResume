import { Text, View } from "@react-pdf/renderer";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import { Style as PDFStyle } from "@react-pdf/types";
import { ICourse, ILink, IProject } from "../../interfaces/forminterfaces";
import { UL,LI } from "../../preview/components/list";

type propsType = {
  state: {
    list: IProject[];
    active?: boolean;
  };
  styles: resumeStyleType;
};


function ResumeView(props: propsType) {
  const { state, styles } = props;
  if (!state.active) {
    return null;
  }


  const projectStyles: { [key: string]: PDFStyle } = {
    title: {
      ...styles.subSectionHeader,
      textTransform: "uppercase",
    },
    year: {
      color: "brown",
    },
  };

  return (
    <View style={styles?.section}>
      <Text style={styles.sectionHeader}>Relevant Projects</Text>
      {state.list.map((project: IProject, index: number) => {
        const { about } = project;
        const lines = about.split("|");
        return (
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader} >{project.title}</Text>
            <Text style={projectStyles.year}>{project.year}</Text>
            <View>
                {/* Job description */}
                <UL>
                  {lines.map((line, index) => {
                    return (
                      <LI key={index}>
                        <Text>{line}</Text>
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
