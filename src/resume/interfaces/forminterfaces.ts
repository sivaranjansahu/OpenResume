export interface IBasicInfo {
  fullName: string;
  about: string;
  email: string;
  address: string;
  phoneNumber: string;
  linkedIn: string;
  website: string;
}

export interface IObjective {
  objective: string;
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
}

export interface IProfile {
  meta: IResumeMeta;
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
}
