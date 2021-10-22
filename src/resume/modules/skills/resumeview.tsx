import { View, Text } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/reduxhooks";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import { IProfile, ISkill } from "../../interfaces/forminterfaces";
import { Style as PDFStyle } from "@react-pdf/types";
import SectionHeading from "../../generators/pdf/templates/headingstyles";
type propsType = {
  state: {
    list: ISkill[];
    active?: boolean;
  };
  styles: resumeStyleType;
  headingDesign:number
};
type maptype = {
  Intermediate: ISkill[];
  Expert: ISkill[];
  Beginner: ISkill[];
};

function SkillsView(props: propsType) {
  //const state = useAppSelector((state) => state);
  const { styles, state,headingDesign } = props;
  const [skillsMap, setSkillsMap] = useState<maptype>({
    Intermediate: [],
    Expert: [],
    Beginner: [],
  });

  const skillStyles: { [key: string]: PDFStyle } = {
    skillName: {
      
    },
    skillLevel: {
      ...styles.subSectionHeader,
    },
  };

  useEffect(() => {
    const map: maptype = {
      Intermediate: [],
      Expert: [],
      Beginner: [],
    };
    state.list.forEach((skill: ISkill) => {
      if (skill.skillLevel == 1) {
        map.Beginner.push(skill);
      }
      if (skill.skillLevel == 2) {
        map.Intermediate.push(skill);
      }
      if (skill.skillLevel == 3) {
        map.Expert.push(skill);
      }
    });
    setSkillsMap(map);
  }, [state.list]);

  if (!state.active) {
    return null;
  }

  return (
    <View style={styles.section}>
      <SectionHeading headingtype={headingDesign} title="Skills" styles={styles}/>
      <View style={{ flexDirection: "row" }}>
        {skillsMap?.Expert.length > 0 && (
          <View style={{ flexGrow: 1, paddingRight: 10 }} debug={false}>
            <Text style={skillStyles.skillLevel}>Expert</Text>
            <Text style={{ width: "30%" }}>
              {skillsMap?.Expert.map((skill: ISkill, index: number) => {
                return <Text style={styles.paragraph}>{skill.skillName},</Text>;
              })}
            </Text>
          </View>
        )}
        {skillsMap?.Intermediate.length > 0 && (
          <View style={{ flexGrow: 1, paddingRight: 10 }} debug={false}>
            <Text style={skillStyles.skillLevel}>Intermediate</Text>
            <Text style={{ width: "30%" }}>
              {skillsMap?.Intermediate.map((skill: ISkill, index: number) => {
                return <Text style={styles.paragraph}>{skill.skillName},</Text>;
              })}
            </Text>
          </View>
        )}
        {skillsMap?.Beginner.length > 0 && (
          <View style={{ flexGrow: 1, paddingRight: 10 }} debug={false}>
            <Text style={skillStyles.skillLevel}>Beginner</Text>
            <Text style={{ width: "30%" }}>
              {skillsMap?.Beginner.map((skill: ISkill, index: number) => {
                return <Text style={styles.paragraph}>{skill.skillName},</Text>;
              })}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default SkillsView;
