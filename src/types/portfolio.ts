export interface LocationInfo {
  city: string;
  address: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: LocationInfo;
  bio: string[];
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export interface SoftwareSkill {
  name: string;
  code?: string;
  level: number;
  color?: string;
}

export interface LanguageSkill {
  name: string;
  level: number;
}

export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  description: string;
}

export interface EducationInfo {
  degree: string;
  school: string;
  details: string;
}

export interface HobbyItem {
  name: string;
  icon: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  softwareSkills: SoftwareSkill[];
  languages: LanguageSkill[];
  personalSkills: string;
  experience: ExperienceItem[];
  education: EducationInfo;
  whatCanIDo: string[];
  designSkills: string[];
  hobbies: HobbyItem[];
  projects: ProjectItem[];
}

export type TabType = 'Home' | 'About' | 'Resume' | 'Portfolio' | 'Contact';
