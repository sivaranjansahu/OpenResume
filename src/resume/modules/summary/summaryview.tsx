import { IBasicInfo, ISummary } from "../../interfaces/forminterfaces";
import { View, Text } from "@react-pdf/renderer";
import { type } from "os";
type propsType = {
  summary:{
    content:string,
    active:boolean
  };
  styles?: any;
};

export type stylesType = {
  h2?: any;
  h4?: any;
  contentblock?: any;
};
const SummaryView: React.FC<propsType> = ({ summary, styles }) => {
  if(!summary.active){
    return null
  }
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Summary</Text>
      <Text>{summary.content}</Text>
    </View>
  );
};


export default SummaryView;
