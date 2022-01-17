import { Text, View } from "@react-pdf/renderer";
import { resumeStyleType } from "../../generators/pdf/basestyles";
import SectionHeading from "../../generators/pdf/templates/headingstyles";
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
      
    </View>
  );
};


export default SummaryView;
