import { TColors } from '../types/colors.type';
import { JobStatus } from '../types/enums/jobStatus.enum';

export function addOrRemoveObject<T extends Record<string, any>>(array: T[], newObject: T): T[] {
	const existingIndex = array.findIndex((item) => item.id === newObject.id);
	return existingIndex === -1
		? [...array, newObject]
		: array.filter((_, index) => index !== existingIndex);
}

export function addOrRemoveObjectId<T extends { id: any }>(array: T[], newObjectId: T['id']): T[] {
	const existingIndex = array.findIndex((item) => item === newObjectId.id);
	return existingIndex === -1
		? [...array, newObjectId.id as T] // Add a new object with only the ID
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

export function formatDateStringToYYYYMMDD(dateString: string | Date | undefined): string {
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

export function searchObjectsByKeyAndValue({
	list,
	key,
	value,
}: {
	list: any[];
	key: string;
	value: string;
}): any[] {
	return list.filter((listItem) => listItem[key].toLowerCase().includes(value.toLowerCase()));
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

export const filterAndExtract = ({
	list,
	key,
	valueForMatch,
	numberOfReturnedItem,
}: {
	list: any[] | undefined | null;
	key: string;
	valueForMatch: string;
	numberOfReturnedItem: number;
}) => {
	if (!list) return [];
	const results: any[] = [];
	for (const item of list) {
		if (item[key] === valueForMatch && results.push(item) >= numberOfReturnedItem) break;
	}
	return results;
};

export const formatTimeString = (dateString: string): string => {
	try {
		const date = new Date(dateString);
		const now = new Date();
		const yesterday = new Date();
		yesterday.setDate(now.getDate() - 1);

		const hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
		const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

		const isToday =
			date.getDate() === now.getDate() &&
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear();

		const isYesterday =
			date.getDate() === yesterday.getDate() &&
			date.getMonth() === yesterday.getMonth() &&
			date.getFullYear() === yesterday.getFullYear();

		if (isToday) {
			return `${formattedTime} Today`;
		} else if (isYesterday) {
			return `${formattedTime} Yesterday`;
		} else {
			const day = date.getDate().toString().padStart(2, '0');
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const year = date.getFullYear();
			return `${day}-${month}-${year}`;
		}
	} catch (error) {
		console.error('Invalid date string:', error);
		return 'Invalid Date';
	}
};

export const formatIsoTimeString = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isToday) {
      return `${formattedTime} Today`;
    } else if (isYesterday) {
      return `${formattedTime} Yesterday`;
    } else {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${formattedTime} ${day}-${month}-${year}`;
    }
  } catch (error) {
    console.error('Invalid date string:', error);
    return 'Invalid Date';
  }
};

type SocialLink = {
	id: string;
	provider: string;
	link: string;
};

type SocialLinkResult = {
	id: string;
	link: string;
} | null;

export const getSocialLinkWithId = (links: SocialLink[], provider: string): SocialLinkResult => {
	if (!links || links.length === 0 || !provider) {
		return null;
	}

	const foundLink = links.find((link) => link.provider === provider);
	return foundLink ? { id: foundLink.id, link: foundLink.link } : null;
};

export const getQueryParamValue = (input: string, paramName: string): JobStatus => {
	try {
		let searchParams;
		if (input.startsWith('http://') || input.startsWith('https://')) {
			// Full URL provided
			const urlObj = new URL(input);
			searchParams = urlObj.searchParams;
		} else {
			// Assume it's a query string
			searchParams = new URLSearchParams(input.startsWith('?') ? input.substring(1) : input);
		}
		const paramValue: JobStatus = searchParams.get(paramName) as JobStatus;
		return paramValue !== null ? paramValue : JobStatus.BACKLOG;
	} catch (error) {
		// Handle cases where the input is not a valid URL or query string.
		console.error('Invalid input:', error);
		return JobStatus.BACKLOG;
	}
};


export const formatString = (inputString: string | null | undefined): string => {
  // Return an empty string if the input is null, undefined, or an empty string
  if (inputString === null || inputString === undefined || inputString === '') {
    return '';
  }

  // Corrected: Replace underscores, hyphens, and commas with spaces
  // Place '-' at the end of the character set to treat it literally,
  // or escape it like /[_,\-]/g
  const cleanedString = inputString.replace(/[_,/,-]/g, ' '); // Changed from /[_-|,]/g

  // Split the string into words, filter out empty strings, and then format each word
  const formattedWords = cleanedString.split(' ').filter(word => word.length > 0).map(word => {
    // Capitalize the first letter and make the rest lowercase
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the formatted words back into a single string
  return formattedWords.join(' ');
};

// Example Usage:
// const input = "koalabyte_monthly_enterprise";
// const output = formatString(input);
// console.log(output); // Expected: "Koalabyte Monthly Enterprise"




export const formatTimestampToDate = (timestamp: number | null | undefined): string => {
  // Return an empty string if the timestamp is null, undefined, or not a valid number
  if (timestamp === null || timestamp === undefined || isNaN(timestamp)) {
    return '';
  }

  // Unix timestamps are typically in seconds, Date constructor expects milliseconds
  const date = new Date(timestamp * 1000);

  // Check if the date object is valid (e.g., if the original timestamp was extremely out of range)
  if (isNaN(date.getTime())) {
    return '';
  }

  // Get month, day, and year
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');

  // Return in MM/DD/YYYY format
  return `${day}-${month}-${year}`;
};



interface User {
  userId: string;
  lastMessage: string;
  unreadCount: number;
  image: string | null;
  name: string;
  createdAt: string;
}


export const hasUnreadMessages = (users: any[]): boolean => {
  // Iterate through each user in the array.
  for (const user of users) {
    // If a user's unreadCount is greater than 0, it means there's at least one unread message.
    if (user.unreadCount > 0) {
      return true; // Immediately return true as the condition is met.
    }
  }
  // If the loop completes, it means no user had an unreadCount greater than 0.
  return false;
};


export const hasUnreadNotifications = (notifications: any[]): boolean => {
  // Iterate through each notification in the array.
  for (const notification of notifications) {
    // If a notification's isRead property is false, it means it's unread.
    if (notification.isRead === false) {
      return true; // Immediately return true as the condition is met.
    }
  }
  // If the loop completes, it means all notifications were read.
  return false;
};


// export const formatString = (inputString: string | null | undefined): string => {
//   if (inputString === null || inputString === undefined) {
//     return "";
//   }

//   const trimmedString = inputString.trim();

//   if (trimmedString === "") {
//     return "";
//   }

//   const words = trimmedString
//     .replace(/[_-\s]+/g, ' ')
//     .split(' ');

//   const formattedWords = words.map(word => {
//     if (word.length === 0) {
//       return "";
//     }
//     return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//   });

//   return formattedWords.join(' ');
// };