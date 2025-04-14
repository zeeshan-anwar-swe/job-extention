import { TColors } from '../types/colors.type';

export function addOrRemoveObject<T extends Record<string, any>>(array: T[], newObject: T): T[] {
	const existingIndex = array.findIndex((item) => item.id === newObject.id);
	return existingIndex === -1
		? [...array, newObject]
		: array.filter((_, index) => index !== existingIndex);
}

export function objectExistsInArray<T extends Record<string, any>>(
	array: T[],
	objectToCheck: T,
): boolean {
	return array.some((item) => item.id === objectToCheck.id);
}

export function findObjectById<T extends { id: string | number }>(
	array: T[],
	id: string | number,
): T | undefined {
	return array.find((item) => item.id === id);
}

export function formatDateStringToYYYYMMDD(dateString: string | undefined): string {
	if (!dateString) return '';
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export function filterTeamMemberByName(teamList: any[], name: string): any[] {
	return teamList.filter((teamMember) =>
		teamMember.user.name.toLowerCase().includes(name.toLowerCase()),
	);
}

// function takes stored of teamlist, joblist and response of assign job to a team member and update the joblist with newly assigned team member
export function updateJobTeam(teamList: any[], jobList: any[], data: any): any[] {
	// Find the team in teamList that matches the teamId from data
	const foundTeam = teamList.find((team) => team.id === data.teamId);

	if (!foundTeam) {
		console.warn(`Team with id ${data.teamId} not found in teamList`);
		return jobList;
	}

	// Convert the team object to the required format
	const convertedTeam: any = {
		teamId: foundTeam.id,
		userId: foundTeam.user.id,
		email: foundTeam.user.email,
		role: foundTeam.user.role,
		image: foundTeam.user.image,
		name: foundTeam.user.name,
	};

	// Update the job in jobList where id matches data.id
	return jobList.map((job) => {
		if (job.id === data.id) {
			return {
				...job,
				team: convertedTeam,
			};
		}
		return job;
	});
}

export function getStatusColor(status: string): TColors {
	switch (status) {
		case 'BACKLOG':
			return 'amber';
		case 'IN_PROGRESS':
			return 'blue';
		case 'TODO':
			return 'zinc';
		case 'IN_REVIEW':
			return 'violet';
		case 'COMPLETED':
			return 'emerald';
		default:
			return 'zinc'; // Default color if status is unknown
	}
}
