export interface TCustomCVSkill {
	name: string;
	endorsement_count: number;
}

export interface TCustomCVUser {
	id: string;
	recordId: string;
	name: string;
	firstName: string;
	lastName: string;
	headline: string;
	location: string;
	industry: string;
	profileUrl: string;
	publicProfileUrl: string;
	profilePictureUrl: string;
	profilePictureUrlLarge: string;
	connectionsCount: number;
	networkDistance: string;
	canSendInmail: boolean;
	recruiterCandidateId: string;
	hiddenCandidate: boolean;
	interestLikelihood: null | any; // You might want to define a more specific type if you know what this could be
	summary: string;
	privacySettings: null | any; // You might want to define a more specific type if you know what this could be
	skills: TCustomCVSkill[];
	languages: any[]; // You might want to define a Language interface
	projects: any[]; // You might want to define a Project interface
	source: string;
	certifications: any[]; // You might want to define a Certification interface
	createdAt: string;
	updatedAt: string;
	workExperience?: any[]; // You might want to define a WorkExperience interface
}

export interface TCustomCVSkill {
	name: string;
	endorsement_count: number;
}
export interface TCustomCVDate {
	year: number;
	month: number;
}

export interface TWorkExperienceCVUserDetails {
	company: string;
	companyUrl: string;
	industry: string;
	location: string;
	role: string;
	start: TCustomCVDate;
	end: TCustomCVDate | null;
	description: string;
}

export interface TCustomCVEducation {
	id: string;
	linkedinId: string;
	degree: string;
	school: string;
	schoolId: number | null;
	fieldOfStudy: string;
	start: TCustomCVDate;
	end: TCustomCVDate | null;
	schoolDetails: any | null;
	createdAt: string;
	updatedAt: string;
}

interface TCustomCVUserDetails {
	id: string;
	recordId: string;
	name: string;
	firstName: string;
	lastName: string;
	headline: string;
	location: string;
	industry: string;
	profileUrl: string;
	publicProfileUrl: string;
	profilePictureUrl: string;
	profilePictureUrlLarge: string;
	connectionsCount: number;
	networkDistance: string;
	canSendInmail: boolean;
	recruiterCandidateId: string;
	hiddenCandidate: boolean;
	interestLikelihood: number | null;
	summary: string;
	privacySettings: any | null;
	skills: TCustomCVSkill[];
	languages: any[];
	projects: any[];
	source: string;
	certifications: any[];
	createdAt: string;
	updatedAt: string;
	education: TCustomCVEducation[];
	workExperience: TWorkExperienceCVUserDetails[];
	description: string;
	logo: any | null;
}

export interface TCustomCVInitialState {
	list: {
		error: Error | null;
		count: number;
		search: string;
		loading: boolean;
		rows: TCustomCVUser[];
	};

  cvDetails: {
    error: Error | null;
    loading: boolean;
    data: TCustomCVUserDetails | null;
  };
}
