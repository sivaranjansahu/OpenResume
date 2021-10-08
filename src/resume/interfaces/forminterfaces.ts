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

export interface workExp {
  company: string;
  fromYear: number;
  toYear: number;
  role: string;
  fromMonth: string;
  toMonth: string;
  jobdescription: string;
}

export interface ISkill {
  id: string;
  skillName: string;
  skillLevel: number;
  skillYearsExperience: number;
}

export interface ICourse {
  id: string;
  title: string;
  institute: string;
  year: number;
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
  };
  summary: {
    info: ISummary;
    active: boolean;
  };
  skills: {
    active: boolean;
    list: ISkill[];
  };
  workHistory: {
    active: boolean;
    list: IWorkHistory[];
  };
  education: {
    active: boolean;
    list: IEducation[];
  };
  courses: {
    active: boolean;
    list: ICourse[];
  };
  links: {
    list: ILink[];
    active: boolean;
  };
  projects: {
    list: IProject[];
    active: boolean;
  };
}
