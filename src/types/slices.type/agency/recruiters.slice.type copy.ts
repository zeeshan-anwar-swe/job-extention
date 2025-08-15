
export interface RecruiterUserListITemType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  createdAt: string;
  industry: string | null;
  location: string | null;
  teamId: string;
  successRate: number;
}

export interface RecruiterListType {
	loading: boolean;
	count: number;
	rows: RecruiterUserListITemType[];
	error: null | any;
	search: string;
}

export interface RecruiterProfileType {
	loading: boolean;
	data: any | null;
	error: null | any;
}

export interface RecruitersInitialStateType {
	reccruitersList: RecruiterListType;
	recruiterProfile: RecruiterProfileType;

}
