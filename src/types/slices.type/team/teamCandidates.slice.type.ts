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

export interface TCandidateJob {
    id: string;
    title: string;
    teamId: string;
    client: Client | null;
}

export interface TTeamCandidateJobProfile {
    id: string;
    roles: null;
    status: string;
    job: TCandidateJob;
}

export interface TeamCandidate {
    id: string;
    name: string;
    email: string;
    image: string;
    profilePictureUrl: string;
    publicProfileUrl: string;
    jobProfiles: TTeamCandidateJobProfile[];
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
