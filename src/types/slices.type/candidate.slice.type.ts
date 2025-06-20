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
  image: string;
  jobProfiles: TCandidateJobProfile[];
}