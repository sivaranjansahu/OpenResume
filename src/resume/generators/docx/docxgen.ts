import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  UnderlineType,
  BorderStyle,
  convertInchesToTwip,
  DocumentBackground,
  Table,
  TableCell,
  WidthType,
  TableRow,
} from "docx";
import style1 from './styles/style1'
import axios from "axios";
//xml file reader

import { saveAs } from "file-saver";
import {
  IEducation,
  IProfile,
  ISummary,
  IWorkHistory,
  ICourse,
  IProject,
} from "../../interfaces/forminterfaces";

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section

import stylesXml from "./styles/styles.xml";

class DocumentCreator {
  // tslint:disable-next-line: typedef
  xmlStyles: any;
  stylesData:any;

  constructor() {
    this.getStyles();
    this.stylesData = style1("style1",{headingColor:"#ff9900"}); 
  }

  async getStyles() {
    this.xmlStyles = await axios.get("./styles.xml");
  }

  public create(state: IProfile): Document {
    const FULL_NAME = state.basicInfo.info.fullName ?? "";
    const PHONE_NUMBER = state.basicInfo.info.phoneno ?? "";
    const PROFILE_URL = state.basicInfo.info.website ?? "";
    const EMAIL = state.basicInfo.info.email ?? "";

    //  axios.get("./styles.xml")
    //  .then(d=>{
    //    console.log('styles',d)
    //  })
    //  ;

    //  const xmlParser = new parser.XMLParser();
    //  const jObj = xmlParser.parse(this.xmlStyles);
    //  console.log('mystyles',this.xmlStyles)

    

    const document = new Document({
      styles: this.stylesData,
//      background:{color:"#dadada"},
      
      sections: [
        { properties:{
          page:{
            margin:{
              left:800,
              right:800,
              top:800,
              bottom:800
            }
          }
        },
          children: [
            new Paragraph({
              text: FULL_NAME,
              heading: HeadingLevel.HEADING_2,
              
              border: {
                top: {
                  color: "auto",
                  space: 1,
                  value: BorderStyle.DASH_SMALL_GAP,
                  size: 6,
                },
                bottom: {
                  color: "auto",
                  space: 1,
                  value: BorderStyle.SINGLE,
                  size: 6,
                },
              },
            }),
            this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
            ...this.createSections(state),
          ],
        },
      ],
    });

    return document;
  }

  public createSections(state: IProfile): Paragraph[] {
    if (!state) return [];
    const sectionsArray: Paragraph[] = [];
    //state.componentOrder.order
    state.componentOrder?.order.forEach((compname: string) => {
      console.log(compname);
      let selected: Paragraph[] = [];
      switch (compname) {
        case "skills":
          selected = this.createSkillList(state.skills.list);
          break;
        case "workExperience":
          selected = this.createWorkHistory(state.workHistory.list);
          break;
        case "summary":
          selected = this.createSummary(state.summary?.content);
          break;
        case "education":
          selected = this.createEducation(state.education.list);
          break;
        case "courses":
          selected = this.createCourses(state.courses.list);
          break;
        case "projects":
          selected = this.createProjects(state.projects.list);
          break;
        //   case "links":
        default:
      }
      sectionsArray.push(...selected);
      // sectionsArray.push(
      //   new Paragraph({
      //     children: selected,
      //     spacing:{
      //       after:1440
      //     }
      //   })
      // )
    });
    // return new Paragraph({
    //   children: sectionsArray,
    //   spacing:{
    //     after:1440
    //   }
    // })
    return sectionsArray;
    // return [
    //     ...this.createEducation(state.education.list),
    //         ...this.createWorkHistory(state.workHistory.list),
    //         ...this.createSkillList(state.skills.list),
    // ]
  }

  public createSummary(summary: string): Paragraph[] {
    const header = this.createHeading("Summary");
    const summaryText = new Paragraph({
      children: [new TextRun(summary ?? "")],
    });
    return [header, summaryText];
  }

  public createProjects(projects: IProject[]): Paragraph[] {
    const projectHeader = this.createHeading("Projects");
    const projectsList = projects
      .map((project: IProject) => {
        const arr: Paragraph[] = [];
        arr.push(
          this.createInstitutionHeader(project.title, `${project.year}`)
        );

        const bulletPoints = this.splitParagraphIntoBullets(project.about);
        bulletPoints.forEach((bulletPoint) => {
          arr.push(this.createBullet(bulletPoint.trim()));
        });

        return arr;
      })
      .reduce((prev: any, curr: any) => prev.concat(curr), []);

    return [projectHeader, ...projectsList];
  }

  public createCourses(courses: ICourse[]): Paragraph[] {
    const coursesHeader = this.createHeading("Courses");
    const coursesList = courses
      .map((course: ICourse) => {
        const arr: Paragraph[] = [];
        arr.push(
          this.createInstitutionHeader(course.institute, `${course.year}`)
        );
        arr.push(this.createRoleText(`${course.title}`));

        return arr;
      })
      .reduce((prev: any, curr: any) => prev.concat(curr), []);

    return [coursesHeader, ...coursesList];
  }

  public createEducation(educations: IEducation[]): Paragraph[] {
    const educationHeader = this.createHeading("Education");
    const educationsList = educations
      .map((education: IEducation) => {
        const arr: Paragraph[] = [];
        arr.push(
          this.createInstitutionHeader(
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

  public createWorkHistory(experiences: IWorkHistory[]): Paragraph[] {
    const header = this.createHeading("Experience");
    const list = experiences
      .map((position: IWorkHistory) => {
        const arr: Paragraph[] = [];

        arr.push(
          this.createInstitutionHeader(
            position.employedIn,
            this.createPositionDateText(
              { month: position.fromMonth, year: position.fromYear },
              { month: position.toMonth, year: position.toYear },
              !!position.isCurrent
            )
          )
        );
        arr.push(this.createRoleText(position.jobTitle));

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

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      //heading: HeadingLevel.HEADING_1,
      //thematicBreak: true,
      style:"section-heading",
      border:this.stylesData.borderStyles
     
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      //heading: HeadingLevel.HEADING_2,
      style:"subsection-heading"
    });
  }

  public createInstitutionHeader(
    institutionName: string,
    dateText: string
  ): Paragraph {

    return new Paragraph({
      
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: 12000,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
          style:"subsection-heading"
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
          style:"content",

          
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
          style:"content",
         
        }),
      ],
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
style:"content",
      bullet: {
        level: 0,
      },
    });
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph[] {
    const heading = this.createHeading("Skills");
    const list = new Paragraph({
      children: [
        new TextRun({
          text: skills.map((skill) => skill.skillName).join(", ") + ".",
          font: {
            name: "Segoe UI",
          },
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

const documentCreator = new DocumentCreator();

export default function generateTestDoc(state: IProfile) {
  console.log(state);
  const doc = documentCreator.create(state);
  // Used to export the file into a .docx file
  // Packer.toBuffer(doc).then((buffer) => {
  //     fs.writeFileSync("My Document.docx", buffer);
  // });
  Packer.toBlob(doc).then((blob) => {
    // saveAs from FileSaver will download the file
    saveAs(blob, "example.docx");
  });
}
