
export interface RecruiterUserProfileType {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	industry: string;
	about: string;
	image: string;
	role: string;
	createdAt: string;
	updatedAt: string;
  }
  

export interface RecruiterProfileType {
	loading: boolean;
	data: RecruiterUserProfileType | null;
	error: null | any;
}

export interface TeamChatInitialStateType {
	recruiterProfile: RecruiterProfileType;
}
