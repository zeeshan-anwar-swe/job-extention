export interface ClientListItemType {
	id: string;
	name: string;
	email: string;
	image: string;
	hiringRate: string;
	jobCounts: number;
	userId?: string;
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
	email: string;
	firstName: string;
	lastName: string;
	image: string;
	createdAt: string;
}

export interface ClientDetailsType {
	id: string;
	companyName: string;
	contactInfo: string;
	userId: string;
	invitedBy: string;
	createdAt: string;
	updatedAt: string;
	jobs: Job[];
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
