export const playMessageSound = () => {
	const audio = new Audio('/sounds/message.mp3');
	audio.play().catch(() => {});
};

export const playNotifcationSound = () => {
	const audio = new Audio('/sounds/notification.mp3');
	audio.play().catch(() => {});
};
