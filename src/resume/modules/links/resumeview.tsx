import { Text, View } from "@react-pdf/renderer";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import { ILink } from "../../interfaces/forminterfaces";
import { Style as PDFStyle } from "@react-pdf/types";
import SectionHeading from "../../generators/pdf/templates/headingstyles";

type propsType = {
  state: {
    list: ILink[];
    active?: boolean;
  };
  styles: resumeStyleType;
  headingDesign:number
};


function ResumeView(props: propsType) {
  const { state, styles,headingDesign} = props;
  if (!state.active) {
    return null;
  }

  const linkStyles: { [key: string]: PDFStyle } = {
    title: {
      ...styles.subSectionHeader,
    },
    url: {
      ...styles.paragraph
    },
    
  };

  return (
    <View style={styles.section}>
      <SectionHeading headingtype={headingDesign} title="Links" styles={styles}/>
      {state.list.map((link: ILink, index: number) => {
        return (
          <View style={styles.subSectionContainer}>
            <Text style={linkStyles.title} >{link.title}</Text>
            <Text>{link.url}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default ResumeView;
