interface Role {
    name: string;
}

export interface TeamJobUserType {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string | null;
    createdAt: string;
    role: Role;
}

interface Team {
    id: string;
    agencyId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    teamUser: TeamJobUserType;
}

interface Client {
    id: string;
    companyName: string;
    contactInfo: string;
    userId: string;
    invitedBy: string;
    createdAt: string;
    updatedAt: string;
    clientUser: TeamJobUserType;
}

interface Candidate {
    name: string;
    email: string;
    image: string;
}

export interface TeamJobCandidateProfile {
    id: string;
    candidateId: string;
    jobId: string;
    status: string;
    education: string;
    about: null | string;
    cv: null | string;
    skills: string[];
    roles: null | any;
    experience: number;
    resumeLink: string;
    candidate: Candidate;
}

export interface TeamJob {
    id: string;
    title: string;
    experience: string;
    location: string;
    type: string;
    status: string;
    positions: number;
    skills: string[];
    createdAt: string;
    team: Team;
    client: Client;
    candidateJobProfiles: TeamJobCandidateProfile[];
    createdBy: string;
}


export interface TeamJobslist {
    count: number;
    rows: TeamJob[];
    loading: boolean;
    error: Error | null;
    search: string;
}

export interface TeamJobsInitialStateType {
   jobList:TeamJobslist
}