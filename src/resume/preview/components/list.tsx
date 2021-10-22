import React from "react";
import {
  pdf,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

const colors = {
  accent: "#4299E1",
  body: "#111",
  heading: "#444",
};

const styles = StyleSheet.create({
  listBlock: {
    paddingLeft: 10,
    paddingRight: 16,
    // paddinGright:"50px"
  },
  listItem: {
    marginBottom: 4,
    flexDirection: "row",
  },
});

export const Bullet = () => {
  return (
    <View
      style={{
        width: 4,
        height: 4,
        backgroundColor: '#444',
        marginRight: 8,
        borderRadius: "50%",
        marginTop: 6,
      }}
    ></View>
  );
};
export const UL = ({ children, ...props }: any) => {
  return (
    <View {...props} style={styles.listBlock} >
      <View>{children}</View>
    </View>
  );
};
export const LI = ({ children,lastItem, ...props }: any) => {
  return (
    <View {...props} style={[styles.listItem,{marginBottom: lastItem ? 0 : 4}]} >
      <Bullet />
      <View>{children}</View>
    </View>
  );
};
