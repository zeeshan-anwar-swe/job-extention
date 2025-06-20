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

interface Team2 {
	id: string;
	teamId: string;
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
	createdBy: string;
	// appliedCandidates?: CandidateJobProfile[];
}

export interface JobDetailsType2 {
	id: string;
	title: string;
	experience: string;
	location: string;
	type: string;
	status: string;
	positions: number;
	skills: string[];
	team: Team2;
	client: Client;
	appliedCandidates?: CandidateJobProfile[];
	candidateJobProfiles?: CandidateJobProfile[];

	createdBy: string;
}


export interface ClientJob {
  id: string;
  title: string;
  experience: string;
  location: string;
  description: string;
  type: string; // Or string if other types are possible
  status: string; // Or string if other statuses are possible
  teamId: string;
  clientId: string;
  skills: string[];
  positions: number;
  createdAt: string; // Consider using Date type if you parse it
  updatedAt: string; // Consider using Date type if you parse it
}

export interface ClientJobsStateType {
  jobs: ClientJob[];
  loading: boolean;
  error: Error | null;
};
