import { IBasicInfo } from "../../interfaces/forminterfaces";
import { View, Text } from "@react-pdf/renderer";
import { type } from "os";
type propsType = {
  info: IBasicInfo;
  styles?: any;
};

export type stylesType = {
  h2?: any;
  h4?: any;
  contentblock?: any;
};
const BasicInfoView: React.FC<propsType> = ({ info, styles }) => {
  return (
    <View style={styles?.contentblock}>
      <Text style={styles?.h2}>{info.fullName}</Text>
      <Text style={styles?.h4}>{info.about}</Text>
    </View>
  );
};

export const Contactview: React.FC<propsType> = ({ info, styles }) => {
  return (
    <View style={styles?.contentblock}>
      <Text style={{ ...styles?.h4, ...styles?.blockHeader }}>Contact</Text>
      <Text style={styles?.sm}>{info?.email}</Text>
      <Text style={styles?.sm}>{info?.address}</Text>
      <Text style={styles?.sm}>{info?.phoneno}</Text>
    </View>
  );
};

export default BasicInfoView;
