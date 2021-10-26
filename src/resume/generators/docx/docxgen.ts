//import * as fs from "fs";
import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
  TabStopPosition,
  TabStopType,
  ShadingType,
  UnderlineType,
  TextDirection,
  VerticalAlign,
  TableBorders,
  convertInchesToTwip,
  SectionType,
  LevelFormat,
} from "docx";
import { saveAs } from "file-saver";
import { useAppSelector } from "../../../store/reduxhooks";
import {
  IEducation,
  IWorkHistory,
  ISkill,
  IProfile,
  IProject,
  ICourse,
} from "../../interfaces/forminterfaces";
import EducationList from "../../modules/education/educationlist";
import styleData from "./styles/1";
import { number } from "yup/lib/locale";
import styleGenerator from "./styles/stylegen";
console.log(styleData);

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
//const customStyles = require("./styles/1.xml");
//const customStyles = fs.readFileSync("./styles/1.xml", "utf-8");

const PHONE_NUMBER = "07534563401";
const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
const EMAIL = "docx@com";

export type colorScheme = {
  headerColor: string;
  subHeaderColor: string;
  bodyTextColor: string;
  bodyColor: string;
  shadingColor: string;
};
export type configProps = {
  headerFont?: string;
  bodyFont?: string;
  headerstyle: string;
  colorScheme: colorScheme;
};

const bullets = ["◽", "▶", "▷", "▸", "▹", "◉", "◈", "◻", "◼", "★", "☆", "⚪"];

class DocumentCreator {
  // tslint:disable-next-line: typedef
  config: configProps;
  state: IProfile;
  styleObj: any;

  constructor(state: any, config: configProps) {
    this.config = config;
    this.state = state;
    this.styleObj = styleGenerator(config);
  }

  public create(): Document {
    const {
      headerFont = "Arial",
      bodyFont = "Segoe UI",
      headerstyle = 1,
      colorScheme,
    } = this.config;

    const document = new Document({
      title: "My resume",
      numbering: {
        config: [
          {
            reference: "custom-bullet-1",
            levels: [
              {
                level: 0,
                format: LevelFormat.BULLET,
                text: "★",
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.25),
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      background: {
        color: colorScheme.bodyColor,
      },

      styles: {
        default: {
          document: {
            run: {
              color: "333",
              font: {
                name: bodyFont,
              },
            },
          },
        },

        paragraphStyles: [
          {
            id: "normal",
            name: "Normal",
            run: {
              color: "auto",
              font: bodyFont,
            },
          },
          this.styleObj.runSettings,
          {
            id: "Heading2",
            name: "Heading 2",
            run: {
              size: 22,
              color: "auto",
              font: headerFont,

              // bold: true,
            },
          },
          {
            id: "subheading",
            name: "subheading",
            run: {
              bold: true,
              size: 22,
              //color: this.config.colorScheme.bodyColor,
              color: "ff0000",
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            type: SectionType.CONTINUOUS,
            page: {
              margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
            },
          },
          children: [this.createDocHeader(this.state)],
        },
        {
          properties: {
            type: SectionType.CONTINUOUS,
            page: {
              margin: {
                top: 720,
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
          children: [
            // new Paragraph({
            //   text: "Dolan Miu",
            //   heading: HeadingLevel.TITLE,
            // }),

            ...this.createSections(this.state),
          ],
        },
      ],
    });

    return document;
  }

  public createSections(state: IProfile): Paragraph[] {
    const sectionsArray: Paragraph[] = [];
    //state.componentOrder.order
    state.componentOrder?.order.forEach((compname: string, index: number) => {
      console.log(compname);
      let selected: Paragraph[] = [];
      switch (compname) {
        case "skills":
          selected = this.createSkillList(state.skills.list);
          break;
        case "workExperience":
          selected = this.createWorkHistory(state.workHistory.list);
          break;
        case "projects":
          selected = this.createProjects(state.projects.list);
          break;
        //case "summary":
        case "education":
          selected = this.createEducation(state.education.list);
          break;

        case "courses":
          selected = this.createCourses(state.courses.list);
          break;
        // case "courses":
        // case "projects":
        //   case "links":
        default:
      }
      sectionsArray.push(...selected);
    });
    return sectionsArray;
    // return [
    //     ...this.createEducation(state.education.list),
    //         ...this.createWorkHistory(state.workHistory.list),
    //         ...this.createSkillList(state.skills.list),
    // ]
  }

  public createEducation(educations: IEducation[]): Paragraph[] {
    const educationHeader = this.makeHeading("Education");
    const educationsList = educations
      .map((education: IEducation) => {
        const arr: Paragraph[] = [];
        arr.push(
          this.createInstitutionHeader(
            education.school,
            education.degree,
            education.school,
            `${education.fromYear} - ${education.toYear}`
          )
        );
        arr.push(
          this.createRoleText(`${education.major} - ${education.degree}`)
        );

        const bulletPoints = this.splitParagraphIntoBullets(education.about);
        bulletPoints.forEach((bulletPoint) => {
          arr.push(this.createBullet(bulletPoint.trim()));
        });

        return arr;
      })
      .reduce((prev: any, curr: any) => prev.concat(curr), []);

    return [educationHeader, ...educationsList];
  }

  public createProjects(projects: IProject[]): Paragraph[] {
    const header = this.makeHeading("Projects");
    const list = projects
      .map((project: IProject, index) => {
        const { title, about, year } = project;
        const arr: Paragraph[] = [];
        arr.push(
          new Paragraph({
            spacing: {
              before: 200,
              after: 150,
            },
            heading: HeadingLevel.HEADING_2,
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: 11440,
              },
            ],
            children: [
              new TextRun({
                text: title,
                ...this.styleObj.subHeaderOptions.title,
              }),

              new TextRun({
                text: `\t${year}`,
                ...this.styleObj.subHeaderOptions.rightMeta,
              }),
            ],
          })
        );
        arr.push(
          new Paragraph({
            children: [
              new TextRun({
                text: about,
                size: 20,
              }),
            ],
          })
        );
        return arr;
      })
      .reduce((prev: any, curr: any) => prev.concat(curr), []);
    return [header, ...list];
  }

  public createCourses(courses: ICourse[]): Paragraph[] {
    const header = this.makeHeading("Courses");

    const list = courses
      .map((course: ICourse, index) => {
        const { title, institute, year } = course;
        const arr: Paragraph[] = [];
        arr.push(
          new Paragraph({
            spacing: {
              before: 200,
              after: 150,
            },
            heading: HeadingLevel.HEADING_2,
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: 11440,
              },
            ],
            children: [
              new TextRun({
                text: title,
                ...this.styleObj.subHeaderOptions.title,
              }),
              new TextRun({
                text: `—${institute}`,
                ...this.styleObj.subHeaderOptions.subTitle,
              }),

              new TextRun({
                text: `\t${year}`,
                ...this.styleObj.subHeaderOptions.rightMeta,
              }),
            ],
          })
        );

        return arr;
      })
      .reduce((prev: any, curr: any) => prev.concat(curr), []);
    return [header, ...list];
  }

  public createWorkHistory(experiences: IWorkHistory[]): Paragraph[] {
    const header = this.makeHeading("Experience");
    const list = experiences
      .map((position: IWorkHistory) => {
        const arr: Paragraph[] = [];

        arr.push(
          this.createInstitutionHeader(
            position.employedIn,
            position.jobTitle,
            position.jobLocation,
            this.createPositionDateText(
              { month: position.fromMonth, year: position.fromYear },
              { month: position.toMonth, year: position.toYear },
              !!position.isCurrent
            )
          )
        );
        //arr.push(this.createRoleText(position.jobTitle));

        const bulletPoints = this.splitParagraphIntoBullets(
          position.jobDescription
        );

        bulletPoints.forEach((bulletPoint) => {
          arr.push(this.createBullet(bulletPoint.trim()));
        });

        return arr;
      })
      .reduce((prev: any, curr: any) => prev.concat(curr), []);

    return [header, ...list];
  }
  public createDocHeader(state: any): Table {
    const { fullName, address, phoneno, email, linkedIn, website } =
      this.state.basicInfo.info;
    return new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      borders: TableBorders.NONE,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: {
                fill: this.config.colorScheme.shadingColor,

                color: "eaeaea",
              },
              margins: {
                top: 360,
                bottom: 360,
                left: 720,
                right: 720,
              },

              children: [
                new Table({
                  width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                  },
                  borders: TableBorders.NONE,

                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              text: fullName,
                              heading: HeadingLevel.TITLE,
                            }),
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: this.state.summary.content,
                                  break: 1,
                                }),
                              ],
                            }),
                          ],
                          verticalAlign: VerticalAlign.TOP,
                          width: {
                            size: 60,
                            type: WidthType.PERCENTAGE,
                          },
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              alignment: AlignmentType.RIGHT,
                              children: [
                                new TextRun({
                                  text: address,
                                  size: 18,
                                }),
                                new TextRun({
                                  text: email,
                                  break: 1,
                                  size: 18,
                                }),
                                new TextRun({
                                  text: phoneno,
                                  break: 1,
                                  size: 18,
                                }),
                                new TextRun({
                                  text: linkedIn,
                                  break: 1,
                                  size: 18,
                                }),
                                new TextRun({
                                  text: website,
                                  break: 1,
                                  size: 18,
                                }),
                              ],
                            }),
                            // new Paragraph({
                            //   text: phoneno,
                            //   alignment: AlignmentType.RIGHT,
                            // }),
                            // new Paragraph({
                            //   text: email,
                            //   alignment: AlignmentType.RIGHT,
                            // }),
                            // new Paragraph({
                            //   text: linkedIn,
                            //   alignment: AlignmentType.RIGHT,
                            // }),
                            // new Paragraph({
                            //   text: website,
                            //   alignment: AlignmentType.RIGHT,
                            // }),
                          ],
                          width: {
                            size: 40,
                            type: WidthType.PERCENTAGE,
                          },
                          verticalAlign: VerticalAlign.TOP,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }
  public createContactInfo(
    phoneNumber: string,
    profileUrl: string,
    email: string
  ): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
        ),
        new TextRun({
          text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
          break: 1,
        }),
      ],
    });
  }

  public makeHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,

      spacing: {
        before: 300,
        after: 200,
      },
      style: "Heading 1",
      ...this.styleObj.otherStyles,
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
      spacing: {
        before: 200,
        after: 150,
      },
      style: "Heading 2",
      //...this.styleObj.otherStyles,
    });
  }

  public createInstitutionHeader(
    institutionName: string,
    roleName: string,
    jobLocation: string,
    dateText: string
  ): Paragraph {
    return new Paragraph({
      spacing: {
        before: 200,
        after: 150,
      },
      heading: HeadingLevel.HEADING_2,
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: 11440,
        },
      ],
      children: [
        new TextRun({
          text: roleName + ` | ${institutionName} `,
          ...this.styleObj.subHeaderOptions.title,
        }),
        new TextRun({
          text: `—${jobLocation}`,
          ...this.styleObj.subHeaderOptions.subTitle,
        }),
        new TextRun({
          text: `\t${dateText}`,
          ...this.styleObj.subHeaderOptions.rightMeta,
        }),
      ],
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
          // font: {
          //   name: "Segoe UI",
          // },
        }),
      ],
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
      numbering: {
        reference: "custom-bullet-1",
        level: 0,
      },
      spacing: {
        after: 50,
      },
      // bullet: {
      //   level: 0,
      // },
    });
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph[] {
    const heading = this.makeHeading("Skills");

    const list = new Paragraph({
      children: [
        new TextRun({
          text: skills.map((skill) => skill.skillName).join(", ") + ".",
          // font: {
          //   name: "Segoe UI",
          // },
        }),
      ],
    });
    return [heading, list];
  }

  // tslint:disable-next-line:no-any
  public createAchivementsList(achivements: any[]): Paragraph[] {
    return achivements.map(
      (achievement) =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0,
          },
        })
    );
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)],
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    if (!text) return [];
    console.log(text.split("•"));
    return text.split("•");
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(
    startDate: any,
    endDate: any,
    isCurrent: boolean
  ): string {
    const startDateText = startDate.month + ". " + startDate.year;
    const endDateText = isCurrent
      ? "Present"
      : `${endDate.month}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }
}

//const documentCreator = new DocumentCreator();

export default function generateTestDoc(state: any, config: configProps) {
  console.log(state);

  const documentCreator = new DocumentCreator(state, config);
  const doc = documentCreator.create();

  // Used to export the file into a .docx file
  // Packer.toBuffer(doc).then((buffer) => {
  //     fs.writeFileSync("My Document.docx", buffer);
  // });
  Packer.toBlob(doc).then((blob) => {
    // saveAs from FileSaver will download the file
    saveAs(blob, "example.docx");
  });
}
