import {
    Document,
    Font, Page,
    PDFViewer, StyleSheet, Text,
    View
} from "@react-pdf/renderer";


  
type propTypes = {
  fontFamily:string,
  accentColor:string
}
// Create styles
const styleGen = ({fontFamily,accentColor= "#3182CE"}:propTypes)=>{
console.log("setting style to "+ fontFamily,accentColor)
  const colors = {
    accent:accentColor,
    body: "#111",
    heading: accentColor,
  };

  return StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#fff",
      alignItems: "stretch",
      fontSize: 9,
      lineHeight: 1.5,
      fontFamily: fontFamily,
      color: colors.body,
    },
  
    section: {
      // margin: 10,
      padding: 10,
      // display:"flex",
      width: "75%",
      // flexGrow: 1,
      // backgroundColor:"red"
    },
    main: {
      width: "100%",
      // paddingRight: 10,
    },
    aside: {
      width: "25%",
      backgroundColor: "#ebebeb",
      padding: 10,
    },
    h1: {
      fontSize: 18,
      fontWeight: 500,
      // fontFamily: 'Pacifico'
    },
    h2: {
      fontSize: 15,
      fontWeight: 500,
      color: "#444",
    },
    h3: {
      fontSize: 12,
      fontWeight: 500,
      color: "#444",
      width: "100%",
    },
    h4: {
      fontSize: 9,
      fontWeight: 700,
      color: "#444",
    },
    sm: {
      fontSize: 8,
      color: colors.body,
    },
    contentblock: {
      marginBottom: 16,
    },
    subsection: {
      marginBottom: 8,
    },
    blockHeader: {
      borderBottom: "0.2px solid #888",
      paddingBottom: 4,
      marginBottom: 8,
      color: colors.heading,
      // width: "100%",
    },
    subBlockHeader: {
      fontSize: 9,
      fontWeight: 700,
      color: colors.heading,
      marginBottom: 4,
    },
    listBlock: {
      paddingLeft: 10,
      paddingRight: 16,
      // paddinGright:"50px"
    },
    listItem: {
      marginBottom: 4,
      flexDirection: "row",
    },
    expHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    //   italic:{
    //       textStyle:"italic"
    //   }
  });
}
 

  export default styleGen;