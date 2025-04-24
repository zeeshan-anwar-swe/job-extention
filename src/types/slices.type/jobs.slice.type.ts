interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	image: string | null;
	createdAt: string;
	role: {
		name: string;
	};
}

interface Team {
	id: string;
	teamUser: User;
}

interface Client {
	id: string;
	clientUser: User;
}

interface Candidate {
	name: string;
	email: string;
	image: string;
}

interface CandidateJobProfile {
	id: string;
	candidateId: string;
	jobId: string;
	status: string;
	education: string;
	about: string | null;
	cv: string | null;
	skills: string[];
	roles: string | null;
	experience: number;
	resumeLink: string;
	candidate: Candidate;
	feedback: string | null;
	socialProfiles: any[]; // Assuming socialProfiles can be an array of any type
}

export interface JobDetailsType {
	id: string;
	title: string;
	experience: string;
	location: string;
	type: string;
	status: string;
	positions: number;
	skills: string[];
	team: Team;
	client: Client;
	candidateJobProfiles?: CandidateJobProfile[];
	// appliedCandidates?: CandidateJobProfile[];
}
