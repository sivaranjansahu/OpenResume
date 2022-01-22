import { Text, View } from "@react-pdf/renderer";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import { ILink } from "../../interfaces/forminterfaces";
import { Style as PDFStyle } from "@react-pdf/types";
import SectionHeading from "../../generators/pdf/templates/headingstyles";
import { useEffect, useState } from "react";

type propsType = {
  state: {
    list: ILink[];
    active?: boolean;
  };
  styles: resumeStyleType;
  headingDesign: number;
};

function ResumeView(props: propsType) {
  const { state, styles, headingDesign } = props;
  const [links, setLinks] = useState<ILink[]>([]);
  useEffect(() => {
    setLinks(state.list);
  }, [state.list]);
  if (!state.active) {
    return null;
  }

  const linkStyles: { [key: string]: PDFStyle } = {
    title: {
      ...styles.subSectionHeader,
    },
    url: {
      ...styles.paragraph,
    },
  };

  return (
    <View style={styles.section}>
      <SectionHeading
        headingtype={headingDesign}
        title="Links"
        styles={styles}
      />
      {links.map((link: ILink, index: number) => {
        return (
          <View style={styles.subSectionContainer} key={index}>
            <Text style={linkStyles.title}>{link.title}</Text>
            <Text>{link.url}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default ResumeView;
