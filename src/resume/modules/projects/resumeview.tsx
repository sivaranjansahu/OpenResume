import { Text, View } from "@react-pdf/renderer";
import { ILink } from "../../interfaces/forminterfaces";

type propsType = {
  state: {
    list: ILink[];
    active?: boolean;
  };
  styles?: any;
};


function ResumeView(props: propsType) {
  const { state, styles = {} } = props;
  if (!state.active) {
    return null;
  }

  return (
    <View style={styles.contentblock}>
      <Text style={{ ...styles.h4, ...styles.blockHeader }}>Links</Text>
      {state.list.map((link: ILink, index: number) => {
        return (
          <View style={{marginBottom: "6px" }}>
            <Text style={{fontWeight: "bold" }} >{link.title}</Text>
            <Text style={styles.sm}>{link.url}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default ResumeView;
