import * as fs from 'fs'
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
} from 'docx'
import { saveAs } from 'file-saver'
import { useAppSelector } from '../../../store/reduxhooks'
import { IEducation,IWorkHistory,ISkill } from '../../interfaces/forminterfaces'
import EducationList from '../../modules/education/educationlist'

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section


const PHONE_NUMBER = '07534563401'
const PROFILE_URL = 'https://www.linkedin.com/in/dolan1'
const EMAIL = 'docx@com'


class DocumentCreator {
  // tslint:disable-next-line: typedef

  public create(state: any): Document {
    const document = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: {
                name: 'Calibri',
              },
            },
          },
        },
      },
      sections: [
        {
          children: [
            new Paragraph({
              text: 'Dolan Miu',
              heading: HeadingLevel.TITLE,
            }),
            this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
            ...this.createSections(state),
           
          ],
        },
      ],
    })

    return document
  }

  public createSections(state:any):Paragraph[]{
      const sectionsArray:Paragraph[] = [];
      //state.componentOrder.order
      state.componentOrder.order.forEach((compname:string,index:number)=>{
          console.log(compname);
          let selected:Paragraph[]=[];
          switch (compname) {
            case "skills": selected=this.createSkillList(state.skills.list);break;
            case "workExperience":selected=this.createWorkHistory(state.workHistory.list);break;
              
            //case "summary":
            case "education":selected = this.createEducation(state.education.list);break
            // case "courses":
            // case "projects":
            //   case "links":
            default:
          }
          sectionsArray.push(...selected)
      })
      return sectionsArray;
    // return [
    //     ...this.createEducation(state.education.list),
    //         ...this.createWorkHistory(state.workHistory.list),
    //         ...this.createSkillList(state.skills.list),
    // ]
  }

public createEducation(educations: IEducation[]): Paragraph[]{
    const educationHeader = this.createHeading('Education');
    const educationsList =  educations
    .map((education: IEducation) => {
      const arr: Paragraph[] = []
      arr.push(
        this.createInstitutionHeader(
          education.school,
          `${education.fromYear} - ${education.toYear}`,
        ),
      )
      arr.push(
        this.createRoleText(
          `${education.major} - ${education.degree}`,
        ),
      )

      const bulletPoints = this.splitParagraphIntoBullets(
        education.about,
      )
      bulletPoints.forEach((bulletPoint) => {
        arr.push(this.createBullet(bulletPoint.trim()))
      })

      return arr
    })
    .reduce((prev: any, curr: any) => prev.concat(curr), [])

    return [educationHeader,...educationsList]
}
  
  public createWorkHistory(experiences: IWorkHistory[]): Paragraph[] {
      const header  = this.createHeading('Experience');
    const list = experiences
      .map((position: IWorkHistory) => {
        const arr: Paragraph[] = []

        arr.push(
          this.createInstitutionHeader(
            position.employedIn,
            this.createPositionDateText(
              { month: position.fromMonth, year: position.fromYear },
              { month: position.toMonth, year: position.toYear },
              !!position.isCurrent,
            ),
          ),
        )
        arr.push(this.createRoleText(position.jobTitle))

        const bulletPoints = this.splitParagraphIntoBullets(
          position.jobDescription,
        )

        bulletPoints.forEach((bulletPoint) => {
          arr.push(this.createBullet(bulletPoint.trim()))
        })

        return arr
      })
      .reduce((prev: any, curr: any) => prev.concat(curr), []);

      return [header, ...list]
  }

  public createContactInfo(
    phoneNumber: string,
    profileUrl: string,
    email: string,
  ): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`,
        ),
        new TextRun({
          text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
          break: 1,
        }),
      ],
    })
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    })
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
    })
  }

  public createInstitutionHeader(
    institutionName: string,
    dateText: string,
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    })
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
          font: {
            name: 'Segoe UI',
          },
        }),
      ],
    })
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,

      bullet: {
        level: 0,
      },
    })
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph[] {
      const heading = this.createHeading('Skills');
    const list = new Paragraph({
      children: [
        new TextRun({
          text: skills.map((skill) => skill.skillName).join(', ') + '.',
          font: {
            name: 'Segoe UI',
          },
        }),
      ],
    })
    return [heading, list]
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
        }),
    )
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)],
    })
  }

  public splitParagraphIntoBullets(text: string): string[] {
    if (!text) return []
    return text.split('•')
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(
    startDate: any,
    endDate: any,
    isCurrent: boolean,
  ): string {
    const startDateText = startDate.month + '. ' + startDate.year
    const endDateText = isCurrent
      ? 'Present'
      : `${endDate.month}. ${endDate.year}`

    return `${startDateText} - ${endDateText}`
  }

}

const documentCreator = new DocumentCreator()

export default function generateTestDoc(state: any) {
  console.log(state)
  const doc = documentCreator.create(state)
  // Used to export the file into a .docx file
  // Packer.toBuffer(doc).then((buffer) => {
  //     fs.writeFileSync("My Document.docx", buffer);
  // });
  Packer.toBlob(doc).then((blob) => {
    // saveAs from FileSaver will download the file
    saveAs(blob, 'example.docx')
  })
}
