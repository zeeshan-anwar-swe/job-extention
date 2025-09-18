export interface ClientListItemType {
	id: string;
	name: string;
	email: string;
	image: string;
	hiringRate: string;
	jobCounts: number;
	userId?: string;
}

export interface ClientListItemTypeSuperAdmin {
  id: string;
  invitedBy: {
    firstName: string;
    lastName: string;
    image: string;
  };
  clientUser: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string | null;
  };
  jobCount: number;
}


interface Job {
	id: string;
	title: string;
	experience: string;
	location: string;
	type: 'ON_SITE' | 'REMOTE' | 'HYBRID';
	status: 'BACKLOG' | 'TO_DO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
	teamId: string;
	clientId: string;
	skills: string[];
	positions: number;
}

interface ClientUser {
	id: string;
	image: string;
	email: string;
	lastName: string;
	firstName: string;
	createdAt: string;
	experience: string;
	industry: string;
	location: string;
	about: string;
	linkedinUrl: null|string;
	twitterUrl: null | string;
	githubUrl: null | string;
	otherUrl?: null | string;
}


interface TeamUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  createdAt: string;
}

interface Team {
  id: string;
  teamUser: TeamUser;
}

export interface ClientDetailsJobs {
  id: string;
  title: string;
  experience: string;
  location: string;
  description: string;
  type: string;
  status: string;
  isDeleted: boolean;
  teamId: string;
  clientId: string;
  skills: string[];
  positions: number;
  team: Team;
}

export interface ClientDetailsType {
	id: string;
	title: string;
	companyName: string;
	contactInfo: string;
	userId: string;
	invitedBy: string;
	createdAt: string;
	updatedAt: string;
	jobs: ClientDetailsJobs[];
	clientUser: ClientUser;
}







export interface TCandidateJobProfile {
	id: string;
	candidateId: string;
}
export interface TJobForClientWithJobs {
	id: string;
	title: string;
	candidateJobProfiles: TCandidateJobProfile[];
}

export interface TClientWithJobs {
	id: string;
	clientUser: {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
		image: string | null;
		createdAt: string;
	};
	jobs: TJobForClientWithJobs[];
}

export interface TClientWithJobInitialState {
	count:number;
	loading: boolean;
	error: Error | null;
	rows: TClientWithJobs[];
}



