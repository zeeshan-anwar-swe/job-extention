import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { apiBaseUrl } from '../constants/crential.constant.ts';
import { useAuth } from './authContext';
import { getInboxMessages } from '../services/message.ts';
import { getNotifications } from '../services/notification.ts';
import { useLocation } from 'react-router-dom';
import { playMessageSound, playNotifcationSound } from '../utils/socketTunes.ts';

interface InboxEntry {
	userId: string;
	lastMessage: string;
	unreadCount: number;
	image: string | null;
	name: string;
	createdAt: string;
}

interface Notification {
	id: string;
	notification: string;
	type: string;
	targetId: string | null;
	createdAt: string;
	isRead: boolean;
	user: {
		firstName: string;
		lastName: string;
		image: string | null;
	};
}

interface SocketContextType {
	socket: Socket | null;
	inbox: Record<string, InboxEntry>;
	notifications: Notification[];
	resetUnread: (userId: string) => void;
	loading: boolean;
	onlineStatusMap: Map<string, boolean>;
	setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	inbox: {},
	notifications: [],
	resetUnread: () => {},
	loading: true,
	onlineStatusMap: new Map(),
	setNotifications: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const [inbox, setInbox] = useState<Record<string, InboxEntry>>({});
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [onlineStatusMap, setOnlineStatusMap] = useState<Map<string, boolean>>(new Map());

	const socketRef = useRef<Socket | null>(null);
	const { userStorage:userData } = useAuth();
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : '';
	const location = useLocation();

	useEffect(() => {
		if (!token || !userData?.id) return;

		const socket = io(apiBaseUrl, {
			auth: { token },
		});
		socketRef.current = socket;
		fetchNotifications();
		fetchInbox();
		socket.on('receive_message', (msg: any) => {
			const isSender = msg.senderId === userData.id;
			const user = isSender ? msg.receiver : msg.sender;
			const userId = user.id;

			const currentChatMatch = location.pathname.match(/\/chat\/([^/]+)/);
			const currentChatUserId = currentChatMatch ? currentChatMatch[1] : null;

			if (!isSender && currentChatUserId !== userId) {
				playMessageSound();
			}

			setInbox((prev) => {
				const existing = prev[userId] || {
					userId,
					lastMessage: '',
					unreadCount: 0,
					image: user.image,
					name: `${user.firstName} ${user.lastName}`,
					createdAt: msg.createdAt,
				};

				return {
					...prev,
					[userId]: {
						...existing,
						lastMessage: msg.text || '',
						unreadCount: isSender ? existing.unreadCount : existing.unreadCount + 1,
						createdAt: msg.createdAt,
					},
				};
			});
		});

		socket.on('notification', (notif: any) => {
			setNotifications((prev) => [JSON.parse(notif), ...prev]);
			playNotifcationSound();
		});
		socket.on('user_status', ({ userId, status }) => {
			setOnlineStatusMap((prev) => {
				const newMap = new Map(prev);
				newMap.set(userId, status === 'online');
				return newMap;
			});
		});

		socket.on(
			'user_status_bulk',
			(statuses: { userId: string; status: 'online' | 'offline' }[]) => {
				setOnlineStatusMap((prev) => {
					const newMap = new Map(prev);
					statuses.forEach(({ userId, status }) => {
						newMap.set(userId, status === 'online');
					});
					return newMap;
				});
			},
		);

		socket.emit('check_user_status', {
			userIds: Object.keys(inbox),
		});

		return () => {
			socket.disconnect();
			socketRef.current = null;
		};
	}, [userData]);

	const fetchInbox = async () => {
		try {
			const response = await getInboxMessages();

			const rows = response.data.rows;
			const result: Record<string, InboxEntry> = {};

			for (const entry of rows) {
				const isSender = entry.senderId === userData?.id;
				const other = isSender ? entry.receiver : entry.sender;
				const userId = other.id;

				result[userId] = {
					userId,
					lastMessage: entry.text || '',
					unreadCount: entry.unreadCount,
					image: other.image,
					name: `${other.firstName} ${other.lastName}`,
					createdAt: entry.createdAt,
				};
			}
			setInbox(result);
			setLoading(false);
		} catch (error) {
			console.error('Failed to fetch inbox', error);
		} finally {
			setLoading(false);
		}
	};

	const fetchNotifications = async () => {
		try {
			const res = await getNotifications();
			setNotifications(res.data.rows);
		} catch (err) {
			console.error('Failed to fetch notifications', err);
		}
	};

	const resetUnread = (userId: string) => {
		setInbox((prev) => {
			const entry = prev[userId];
			if (!entry) return prev;
			return {
				...prev,
				[userId]: {
					...entry,
					unreadCount: 0,
				},
			};
		});
	};

	return (
		<SocketContext.Provider
			value={{
				socket: socketRef.current,
				inbox,
				notifications,
				resetUnread,
				loading,
				onlineStatusMap,
				setNotifications,
			}}>
			{children}
		</SocketContext.Provider>
	);
};
