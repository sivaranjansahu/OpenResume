import { BorderStyle, convertInchesToTwip, UnderlineType } from "docx";
interface IObjectKeys {
  [key: string]: any;
}
const getStyles = (
  styleCode = "style1",
  {
    headingColor = "#333333",
    subHeadingColor = "#111111",
    fontName = "Arial",
    contentColor = "#222",
  }
): any => {
  const styles: IObjectKeys = {
      style3:{
        default: {
            normal: {
              run: {
                color: "FFFF00",
                font: "Arial",
              },
            },
            
          },
      },
    style1: {
      default: {
        normal: {
          run: {
            color: "FFFF00",
            font: "Segoe UI",
          },
        },
        heading1: {
          run: {
            size: 28,
            bold: true,
            italics: true,
            color: "FF0000",
            font: "Segoe UI",
          },
        },
        heading2: {
          run: {
            size: 26,
            bold: true,
            underline: {
              type: UnderlineType.DOUBLE,
              color: "FF0000",
            },
          },
        },
      },
      paragraphStyles: [
        //This first object in the array is the base style from which other objects inherit
        {
          name: "Normal",
          run: {
            font: fontName,
          },
          paragraph: {
            spacing: {
              after: convertInchesToTwip(0.05),
            },
          },
          
        },
        {
          id: "section-heading",
          name: "Section Heading",
          basedOn: "Normal",
          next: "Normal",
          run: {
            color: headingColor,
            // italics: true,

            bold: true,
            size: 24,
            
          },
          
          paragraph: {
            spacing: {
              before: convertInchesToTwip(0.25),
            },
          },
        },
        {
          id: "subsection-heading",
          name: "Subsection Heading",
          basedOn: "Normal",
          next: "Normal",
          run: {
            color: subHeadingColor,
          },
          paragraph: {},
        },
        {
          id: "content",
          name: "Content",
          basedOn: "Normal",
          next: "Normal",
          run: {
            color: contentColor,
            size: 20,
          },
          paragraph: {},
        },
      ],
      borderStyles: {
        
        bottom: {
            color: "auto",
            space: 64,
            value: BorderStyle.SINGLE,
            size: 16
        },
    },
    },
    style2: {
      paragraphStyles: [
        {
          id: "section-heading",
          name: "Section Heading",
          basedOn: "Normal",
          next: "Normal",
          run: {
            color: headingColor,
            italics: true,
            bold: true,
            size: 36,
          },
          paragraph: {
            // indent: {
            //   left: convertInchesToTwip(0.5),
            // },
            // spacing: {
            //   line: 276,
            // },
          },
        },
        {
          id: "subsection-heading",
          name: "Subsection Heading",
          basedOn: "Normal",
          next: "Normal",
          run: {
            color: subHeadingColor,
            italics: true,
          },
          paragraph: {},
        },
        {
          id: "content",
          name: "Content",
          basedOn: "Normal",
          next: "Normal",
          run: {
            color: contentColor,
            size: 20,
          },
          paragraph: {},
        },
      ],
      borderStyles: {
        top: {
            color: "auto",
            space: 4,
            value: BorderStyle.SINGLE,
            size: 12,
        },
        
    },
    },
  };

  return styles[styleCode];
};

export default getStyles;
