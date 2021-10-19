import { Text, View } from "@react-pdf/renderer";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import { ILink } from "../../interfaces/forminterfaces";
import { Style as PDFStyle } from "@react-pdf/types";

type propsType = {
  state: {
    list: ILink[];
    active?: boolean;
  };
  styles: resumeStyleType;
};


function ResumeView(props: propsType) {
  const { state, styles} = props;
  if (!state.active) {
    return null;
  }

  const linkStyles: { [key: string]: PDFStyle } = {
    title: {
      ...styles.subSectionHeader,
      textTransform: "uppercase",
    },
    url: {
      color: "green",
    },
    
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Links</Text>
      {state.list.map((link: ILink, index: number) => {
        return (
          <View style={styles.subSectionContainer}>
            <Text style={linkStyles.title} >{link.title}</Text>
            <Text style={linkStyles.url}>{link.url}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default ResumeView;
