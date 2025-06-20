export interface TeamMemberType {
  id: string;
  clientIds: string[];
  user: {
    id: string;
    email: string;
    role: string;
    name: string;
    image: string | null;
  };
  jobsClosedPercentage: number;
  jobsInProgress: number;
  jobsInBackLog: number;
}