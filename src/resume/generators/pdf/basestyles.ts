import { StyleSheet } from "@react-pdf/renderer";
import { Style as PDFStyle } from "@react-pdf/types";
type propTypes = {
  headingFont: string;
  bodyFont: string;
  accentColor: string;
};

const getTokens = (baseSize: number) => ({
  heading1: {
    fontSize: baseSize * 2,
    lineHeight: 1.3,
  },
  heading2: {
    fontSize: baseSize * 1.4,
    lineHeight: 1.3,
  },
  heading3: {
    fontSize: baseSize,
    lineHeight: 1.6,
  },
  gap: {
    marginBottom: baseSize * 1.4,
  },
  p: {
    fontSize: baseSize,
  },
  tiny: {
    fontSize: baseSize * 0.8,
  },
});

// Create styles
const tokens = getTokens(10);

export type resumeStyleType = {
  page: PDFStyle;
  sectionHeader: PDFStyle;
  subSectionHeader: PDFStyle;
  section: PDFStyle;
  subSection: PDFStyle;
  main: PDFStyle;
  aside: PDFStyle;
  sectionContainer: PDFStyle;
  subSectionContainer: PDFStyle;
  paragraph: PDFStyle;
  heading1: PDFStyle;
  heading2: PDFStyle;
  heading3: PDFStyle;
  tiny: PDFStyle;
};

// Create styles
const styleGen = ({
  headingFont,
  bodyFont = "opensans",
  accentColor = "#3182CE",
}: propTypes) => {
  console.log("setting style to " + headingFont, accentColor);

  const customStyles: resumeStyleType = {
    //Layout
    page: {
      //padding:'10pt',
      color: "#444",
      ...tokens.p,
      lineHeight: 1.3,
      fontFamily: bodyFont,
    },
    section: {
      ...tokens.gap,
    },
    subSection: {
      ...tokens.gap,
    },
    //Typography
    heading1: {
      ...tokens.heading1,
      fontFamily: headingFont,
    },
    heading2: { ...tokens.heading2, fontFamily: headingFont },
    heading3: { ...tokens.heading3, fontFamily: headingFont },
    paragraph: {
      ...tokens.p,
      lineHeight: 1.3,
      fontFamily: bodyFont,
      // fontWeight:"regular",
    },
    sectionHeader: {
      ...tokens.heading2,
      // marginBottom:10,
      color: accentColor,
      fontFamily: headingFont,
      // fontWeight:500
    },
    sectionContainer: {},
    subSectionContainer: {},
    subSectionHeader: {
      ...tokens.heading3,
    },
    tiny: {
      ...tokens.tiny,
    },
    main: {
      width: "100%",
      padding: 10,
      // paddingRight: 10,
    },
    aside: {
      width: "25%",
      backgroundColor: "#ebebeb",
      padding: 10,
    },
  };

  const newStyleObj = StyleSheet.create(customStyles);
  console.log(newStyleObj);

  return newStyleObj;
};

export default styleGen;
