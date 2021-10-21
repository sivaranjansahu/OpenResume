import { IEducation, IWorkHistory } from "../../interfaces/forminterfaces";
import { View, Text } from "@react-pdf/renderer";
import { Style as PDFStyle } from "@react-pdf/types";
import { LI, UL } from "../../preview/components/list";
import { resumeStyleType } from "../../generators/pdf/basestyles";

type propsType = {
  state: {
    list: IEducation[];
    active?: boolean;
  };
  styles: resumeStyleType;
};

function ResumeView(props: propsType) {
  const { state, styles } = props;
  if (!state.active) {
    return null;
  }

  const educationStyles: { [key: string]: PDFStyle } = {
    degree: {
      ...styles.subSectionHeader,
    },
    school: {
      ...styles.paragraph,

    },
    duration: {
      ...styles.paragraph
    },
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Education</Text>
      <View style={styles.sectionContainer}>
        {state.list.map((edu, index) => {
          const { about } = edu;
          const lines = about.split("•");
          return (
            <View style={styles.subSectionContainer}>
              <View
                style={[
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                <View>
                  <Text>
                    <Text style={educationStyles.degree}>
                      {edu.degree}{" "}|{" "}
                    </Text>
                    <Text style={educationStyles.school}>
                      {edu.school}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={educationStyles.duration}>
                    {`${edu.fromMonth} ${edu.fromYear}`}{" "}{`to ${edu.toMonth} ${edu.toYear}`}
                    {/* {!exp.isCurrent
                      ? `to ${exp.toMonth} ${exp.toYear}`
                      : "to present"} */}
                  </Text>
                </View>
              </View>
              <View>
                {/* Job description */}
                <UL>
                  {lines.map((line, index) => {
                    return (
                      <LI key={index}>
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
    </View>
  );
}

export default ResumeView;
