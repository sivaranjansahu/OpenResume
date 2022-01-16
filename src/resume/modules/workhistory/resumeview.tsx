import { IWorkHistory } from "../../interfaces/forminterfaces";
import { View, Text } from "@react-pdf/renderer";
import { Style as PDFStyle } from "@react-pdf/types";
import { LI, UL } from "../../preview/components/list";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import SectionHeading from "../../generators/pdf/templates/headingstyles";

type propsType = {
  state: {
    list: IWorkHistory[];
    active?: boolean;
  };
  styles: resumeStyleType;
  headingDesign: number;
};

function ResumeView(props: propsType) {
  const { state, styles, headingDesign } = props;
  if (!state.active) {
    return null;
  }

  const workHistoryStyles: { [key: string]: PDFStyle } = {
    jobTitle: {
      ...styles.subSectionHeader,
    },
    companyName: {
      ...styles.paragraph,
    },
    duration: {
      ...styles.paragraph,
    },
  };

  return (
    <View style={styles.section}>
      {/* <Text style={[styles.sectionHeader]} >Relevant Experience</Text> */}
      <SectionHeading
        headingtype={headingDesign}
        title="Relevant Experience"
        styles={styles}
      />
      <View style={styles.sectionContainer}>
        {state.list.map((exp, index) => {
          const { jobDescription } = exp;
          const lines = jobDescription.split("•");
          return (
            <View
              style={[
                styles.subSectionContainer,
                {
                  marginTop:
                    index === 0 ? 0 : styles.subSectionContainer.marginTop,
                },
              ]}
            >
              <View
                style={[
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                <View>
                  <Text>
                    <Text style={workHistoryStyles.jobTitle}>
                      {exp.jobTitle} |{" "}
                    </Text>
                    <Text style={workHistoryStyles.companyName}>
                      {exp.employedIn}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={workHistoryStyles.duration}>
                    {`${exp.fromMonth} ${exp.fromYear}`}{" "}
                    {!exp.isCurrent
                      ? `to ${exp.toMonth} ${exp.toYear}`
                      : "to present"}
                  </Text>
                </View>
              </View>
              <View>
                {/* <Text style={styles.paragraph}>{jobDescription}</Text> */}

                {/* Job description */}
                <UL>
                  {lines.map((line, index) => {
                    return (
                      <LI key={index} lastItem={index === lines.length - 1}>
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
