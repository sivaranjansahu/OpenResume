import { IWorkHistory } from "../../interfaces/forminterfaces";
import { View, Text } from "@react-pdf/renderer";
import { LI, UL } from "../preview/components";

type propsType = {
  history: IWorkHistory[];
  active?: boolean;
  styles?: any;
};

export type stylesType = {
  subSectionContainer?: any;
  sectionContainer?: any;
  subSectionHeader?: any;
  jobTitle?: any;
  companyName?: any;
  duration?: any;
};

function ResumeView(props: propsType) {
  const { history, styles = {}, active } = props;
  if (!active) {
    return null;
  }

  return (
    <View style={styles.contentblock}>
      <Text style={{ ...styles.h3, ...styles.blockHeader }}>
        Relevant Experience
      </Text>
      <View style={styles.sectionContainer}>
        {history.map((exp, index) => {
          const { jobDescription } = exp;
          const lines = jobDescription.split("|");
          return (
            <View style={styles.subSectionContainer}>
              <View
                style={[
                  styles.subSectionHeader,
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                <View>
                  <Text style={styles.jobTitle}>
                    {exp.jobTitle}{" "}
                    <Text style={styles.companyName}>{exp.employedIn}</Text>
                  </Text>
                </View>
                <View>
                  <Text
                    style={styles.duration}
                  >{`${exp.fromMonth} ${exp.fromYear} to ${exp.toMonth} ${exp.toYear}`}</Text>
                </View>
              </View>
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
    </View>
  );
}

export default ResumeView;
