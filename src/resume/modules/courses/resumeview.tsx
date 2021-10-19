import { Text, View } from "@react-pdf/renderer";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import { Style as PDFStyle } from "@react-pdf/types";
import { ICourse, ILink } from "../../interfaces/forminterfaces";

type propsType = {
  state: {
    list: ICourse[];
    active?: boolean;
  };
  styles: resumeStyleType;
};


function ResumeView(props: propsType) {
  const { state, styles } = props;
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
      <Text style={styles.sectionHeader}>Courses / Certifications</Text>
      {state.list.map((course: ICourse, index: number) => {
        return (
          <View style={styles.subSectionContainer}>
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
