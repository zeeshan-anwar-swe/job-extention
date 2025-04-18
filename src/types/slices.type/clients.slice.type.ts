export interface ClientListItemType {
	id: string;
	name: string;
	email: string;
	image: string;
	hiringRate: string;
	jobCounts: number;
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
