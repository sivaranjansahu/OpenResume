export interface IBasicInfo {
  fullName: string;
  //about: string;
  email: string;
  address: string;
  phoneno: string;
  linkedIn: string;
  website: string;
}

export interface ISummary {
  summary: string;
}

// export interface workExp {
//   company: string;
//   fromYear: number;
//   toYear: number;
//   role: string;
//   fromMonth: string;
//   toMonth: string;
//   jobdescription: string;
// }

export interface ISkill { 
  id: string;
  skillName: string;
  skillLevel: number;
  skillYearsExperience?: number;
}

export interface ICourse {
  id: string;
  title: string;
  institute: string;
  year: number;
}

export interface ICustomSection{
  guid:string,
  title:string,
  content: string;
  active:boolean;
}

export interface IWorkHistory {
  id: string;
  employedIn: string;
  fromYear: number;
  toYear: number;
  
  fromMonth: string;
  toMonth: string;
  jobTitle: string;
  jobDescription: string;
  isCurrent?: boolean;
  jobLocation: string;
}

export interface IEducation {
  id: string;
  school: string;
  fromYear: number;
  toYear: number;
  fromMonth: string;
  toMonth: string;
  degree: string;
  major: string;
  about: string;
}

export interface IResumeMeta {
  id: string;
  profileName: string;
  lastUpdated: string;
  profileNotes: string;
}

export interface ILink {
  id: string;
  title: string;
  url: string;
}

export interface IProject {
  id: string;
  title: string;
  about: string;
  year: string;
}

export interface IProfile {
  meta: IResumeMeta;
  basicInfo: {
    info: IBasicInfo;
    active: boolean;
    altName?:string;
  };
  summary: {
    content: string;
    active: boolean;
    altName?:string;
  };
  skills: {
    active: boolean;
    list: ISkill[];
    altName?:string;
  };
  workHistory: {
    active: boolean;
    altName?:string;
    list: IWorkHistory[];
  };
  education: {
    active: boolean;
    list: IEducation[];
    altName?:string;
  };
  courses: {
    active: boolean;
    list: ICourse[];
    altName?:string;
  };
  links: {
    list: ILink[];
    active: boolean;
    altName?:string;
  };
  projects: {
    list: IProject[];
    active: boolean;
    altName?:string;
  };
  componentOrder?:{
    order:string[]
  };
  customSections?:{
    list:ICustomSection[]
  }
}
