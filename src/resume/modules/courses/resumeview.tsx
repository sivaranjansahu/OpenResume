import { Text, View } from "@react-pdf/renderer";
import { Style as PDFStyle } from "@react-pdf/types";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import SectionHeading from "../../generators/pdf/templates/headingstyles";
import { ICourse } from "../../interfaces/forminterfaces";

type propsType = {
  state: {
    list: ICourse[];
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


  const courseStyles: { [key: string]: PDFStyle } = {
    title: {
      ...styles.subSectionHeader,
      textTransform: "uppercase",
    },
    institute: {
      color: "green",
    },
    year: {
      color: "brown",
    },
  };

  return (
    <View style={styles?.section}>
      <SectionHeading headingtype={headingDesign} title="Courses / Certifications" styles={styles}/>

      {state.list.map((course: ICourse, index: number) => {
        return (
          <View key={index} style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader} >{course.title}</Text>
            <Text style={courseStyles.institute}>{course.institute}</Text>
            <Text style={courseStyles.year}>{course.year}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default ResumeView;
