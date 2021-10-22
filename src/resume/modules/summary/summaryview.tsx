import { IBasicInfo, ISummary } from "../../interfaces/forminterfaces";
import { View, Text } from "@react-pdf/renderer";
import { type } from "os";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import SectionHeading, { SectionHeading1 } from "../../generators/pdf/templates/headingstyles";
type propsType = {
  summary:{
    content:string,
    active:boolean
  };
  styles: resumeStyleType;
  headingDesign:number
};

export type stylesType = {
  h2?: any;
  h4?: any;
  contentblock?: any;
};
const SummaryView: React.FC<propsType> = ({ summary, styles,headingDesign }:propsType) => {
  if(!summary.active){
    return null
  }
  
  return (
    <View>
    <View style={styles.section}>
      <SectionHeading headingtype={headingDesign} title="Summary" styles={styles}/>
      <Text style={styles.paragraph}>{summary.content}</Text>
      </View>
      {/* <View style={styles.section}>
      <SectionHeading headingtype={2} title="Summary" styles={styles}/>
      <Text style={styles.paragraph}>{summary.content}</Text>
      </View>
      <View style={styles.section}>
      <SectionHeading headingtype={3} title="Summary" styles={styles}/>
      <Text style={styles.paragraph}>{summary.content}</Text>
      </View>
      <View style={styles.section}>
      <SectionHeading headingtype={4} title="Summary" styles={styles}/>
      <Text style={styles.paragraph}>{summary.content}</Text>
    </View>
    <View style={styles.section}>
      <SectionHeading headingtype={5} title="Summary" styles={styles}/>
      <Text style={styles.paragraph}>{summary.content}</Text>
      </View>
      <View style={styles.section}>
      <SectionHeading headingtype={6} title="Summary" styles={styles}/>
      <Text style={styles.paragraph}>{summary.content}</Text>
    </View>
    <View style={styles.section}>
      <SectionHeading headingtype={7} title="Summary" styles={styles}/>
      <Text style={styles.paragraph}>{summary.content}</Text>
    </View>
    <View style={styles.section}>
      <SectionHeading headingtype={8} title="Summary" styles={styles}/>
      <Text style={styles.paragraph}>{summary.content}</Text>
    </View> */}
    </View>
  );
};


export default SummaryView;
