interface ClientUser {
    firstName: string;
    lastName: string;
    email: string;
}

interface Client {
    id: string;
    companyName: string;
    contactInfo: string;
    userId: string;
    invitedBy: string;
    createdAt: string;
    updatedAt: string;
    clientUser: ClientUser;
}

interface Job {
    id: string;
    title: string;
    teamId: string;
    client: Client;
}

interface JobProfile {
    id: string;
    roles: null;
    status: string;
    job: Job;
}

export interface TeamCandidate {
    id: string;
    name: string;
    email: string;
    image: string;
    jobProfiles: JobProfile[];
}

export interface TeamCandidatesStateType {
    rows: TeamCandidate[];
    count: number;
    loading: boolean;
    error: Error | null;
    search: string;
}

export interface TeamCandidatesInitialStateType {
   list: TeamCandidatesStateType
}
