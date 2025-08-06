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
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  clientUser: ClientUser;
}

interface Job {
  id: string;
  title: string;
  teamId: string;
  client: Client;
}

export interface TCandidateJobProfile {
  id: string;
  roles: string[]; 
  status: string; 
  job: Job;
}

export interface TCandidateListItem {
  id: string;
  name: string;
  email: string;
  publicProfileUrl: string
  profilePictureUrl?: string
  image: string;
  jobProfiles: TCandidateJobProfile[];
}









export interface FeedbackBy {
    feedback: string;
    createdAt: string;
    name: string;
    image: string | null;
}

export interface AssignedJob {
    title: string;
    experience: string;
    type: string; // Assuming these are the only possible values
    status: string; // Assuming these are the only possible values
    feedbackBy: FeedbackBy;
}

export interface CandidateInfo {
    name: string;
    email: string;
    image: string;
}

export interface CandidateProfile {
    id: string;
    candidateId: string;
    jobId: string;
    status:  string; 
    education: string;
    about: string | null;
    cv: string | null;
    skills: string[];
    roles: string[] | null;
    experience: number;
    resumeLink: string;
    socialProfiles: string[];
    candidate: CandidateInfo;
    location: string;
    availabilty: string;
    assignedJobs: AssignedJob[];
}