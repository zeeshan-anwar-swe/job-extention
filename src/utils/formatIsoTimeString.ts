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
