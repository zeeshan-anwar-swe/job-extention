import { useEffect, useState, ChangeEvent, FC, KeyboardEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../../components/ui/Card';

import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import { useAuth } from '../../../../context/authContext';
import { apiBaseUrl } from '../../../../constants/crential.constant';
import { useSocket } from '../../../../context/socketContext';
import Icon from '../../../../components/icon/Icon';
import { formatIsoTimeString } from '../../../../utils/formatIsoTimeString';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../../../components/layouts/Container/Container';
import Button from '../../../../components/ui/Button';

// Define TypeScript Interfaces
interface Media {
	id?: string;
	mediaType: string;
	mediaUrl: string;
}
interface ChatMessage {
	senderId: string;
	receiverId: string;
	text?: string;
	media?: Media[];
	createdAt?: string;
	seen?: boolean;
}

interface AuthContextType {
	userData: {
		id: string;
	};
}

type UserStatus = {
	userId: string;
	status: 'online' | 'offline';
};

const ChatPage: FC = () => {
	const { userStorage:userData } = useAuth();
	const { userId } = useParams<{ userId: string }>();
	const [chat, setChat] = useState<ChatMessage[]>([]);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const location = useLocation();
	const { name } = location.state || {};
	const [loadingMore, setLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [text, setText] = useState<string>('');
	const [files, setFiles] = useState<File[]>([]);
	const [onlineStatus, setOnlineStatus] = useState<Map<string, boolean>>(new Map());

	const { socket } = useSocket();

	const token: string = localStorage.getItem('token')
		? JSON.parse(localStorage.getItem('token') as string)
		: '';

	useEffect(() => {
		if (!userId || !socket) return;

		const handleStatus = ({ userId, status }: UserStatus) => {
			setOnlineStatus((prevStatus) => {
				const newMap = new Map(prevStatus);
				newMap.set(userId, status === 'online');
				return newMap;
			});
		};

		const handleBulkStatus = (statuses: UserStatus[]) => {
			setOnlineStatus((prevStatus) => {
				const newMap = new Map(prevStatus);
				statuses.forEach(({ userId, status }) => {
					newMap.set(userId, status === 'online');
				});
				return newMap;
			});
		};

		const handleIncomingMessage = (message: ChatMessage) => {
			if (
				(message.receiverId === userId && message.senderId === userData.id) ||
				(message.receiverId === userData.id && message.senderId === userId)
			) {
				setChat((prevState) => [...prevState, message]);

				if (message.receiverId === userData.id && message.senderId === userId) {
					socket.emit('messages_seen', { senderId: userId });
				}
			}
		};

		
		socket.emit('messages_seen', { senderId: userId });
		socket.on('user_status', handleStatus);
		socket.on('user_status_bulk', handleBulkStatus);
		socket.on('receive_message', handleIncomingMessage);

		socket.on('messages_seen', ({ seenBy, messageIds }) => {
			console.log(seenBy);
			setChat((msgs) =>
				msgs.map((msg: any) =>
					messageIds.includes(msg.id) ? { ...msg, seen: true } : msg,
				),
			);
			socket.emit('messages_seen', { receiverId: userId });
		});

		socket.emit('check_user_status', { userIds: [userId] });

		return () => {
			socket.off('user_status', handleStatus);
			socket.off('user_status_bulk', handleBulkStatus);
			socket.off('receive_message', handleIncomingMessage);
			socket.off('messages_seen', handleIncomingMessage);
		};
	}, [token, userId, socket]);

	useEffect(() => {
		if (!token || !userId) return;
		axios
			.get<{ data: ChatMessage[] }>(`${apiBaseUrl}/chat/messages/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				const sortedMessages = res.data.data.sort(
					(a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
				);
				setChat(sortedMessages);
			})
			.catch((err) => console.error(err));
	}, [userId]);

	const isUserOnline = (id?: string) => (id && onlineStatus.get(id)) || false;

	// Send message function
	const sendMessage = async () => {
		if (!text.trim() && files.length === 0) return;

		let media: Media[] = [];

		// Upload files if any
		if (files.length > 0) {
			const formData = new FormData();
			files.forEach((file) => formData.append('files', file));
			formData.append('receiverId', userId || '');
			formData.append('text', text.trim());

			try {
				const res = await axios.post<{ data: any }>(
					`${apiBaseUrl}/chat/messages/send`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${token}`,
						},
					},
				);
				media = res.data.data.media;
			} catch (err) {
				console.error('File upload failed', err);
				return;
			}
		}

		const message: ChatMessage = {
			senderId: userData.id,
			receiverId: userId || '',
			text: text.trim(),
			media,
			createdAt: new Date().toISOString(),
		};

		socket?.emit('send_message', message);
		setText('');
		setFiles([]);
	};

	// Handle file selection
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFiles(Array.from(e.target.files));
		}
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && (text.trim() || files.length > 0)) {
			e.preventDefault();
			sendMessage();
		}
	};

	const handleScroll = () => {
		if (chatContainerRef.current?.scrollTop === 0 && hasMore && !loadingMore) {
			loadMoreMessages();
		}
	};

	const loadMoreMessages = async () => {
		if (!chat.length) return;
		setLoadingMore(true);
		try {
			const oldest = chat[0];
			const res = await axios.get(
				`${apiBaseUrl}/chat/messages/${userId}?limit=10&before=${oldest.createdAt}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			const moreMessages = res.data.data;
			if (moreMessages.length === 0) setHasMore(false);
			else {
				const allMessages = [...moreMessages, ...chat];
				const sorted = allMessages.sort(
					(a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
				);
				setChat(sorted);
			}
		} catch (err) {
			console.error('Failed to load more messages', err);
		}
		setLoadingMore(false);
	};

	return (
		<PageWrapper name='Chat'>
			<Container className='!grid h-full !grid-cols-12 !gap-4'>
				<Card className='col-span-12 flex flex-col gap-2'>
					<CardHeader>
						<CardHeaderChild className='!flex w-full !items-center !justify-between'>
							<div className='flex items-center gap-2'>
								<h1 className='text-lg font-semibold'>{name}</h1>
								<span
									className={`h-2 w-2 rounded-full ${
										isUserOnline(userId) ? 'bg-green-500' : 'bg-gray-400'
									}`}></span>
							</div>
						</CardHeaderChild>
					</CardHeader>

					<NavSeparator />
					<div className='flex flex-1 flex-col-reverse' style={{ maxHeight: '70vh' }}>
						<div
							ref={chatContainerRef}
							onScroll={handleScroll}
							className='flex flex-1 flex-col gap-4 overflow-y-auto'>
							<CardBody className='flex flex-col gap-4'>
								{chat.map((msg, index) => (
									<div
										key={index}
										className={`flex ${msg.senderId === userData.id ? 'justify-end' : 'justify-start'}`}>
										<div
											className={`max-w-[70%] rounded-md ${msg.senderId === userData.id ? 'bg-blue-100 ' : 'bg-zinc-100'} p-3 shadow-md`}>
											<strong>
												{msg.senderId === userData.id ? 'You' : 'Them'}:
											</strong>
											{msg.text && <p>{msg.text}</p>}
											{msg.media?.map((media, idx) => (
												<div key={idx} className='mt-2'>
													{media.mediaType === 'image' && (
														<img
															src={apiBaseUrl + media.mediaUrl}
															alt='Media'
															className='h-20 w-20 rounded-lg'
														/>
													)}
													{media.mediaType === 'video' && (
														<video
															src={apiBaseUrl + media.mediaUrl}
															controls
															className='h-20 w-20 rounded-lg'
														/>
													)}
													{media.mediaType === 'audio' && (
														<audio
															src={apiBaseUrl + media.mediaUrl}
															controls
															className='w-full'
														/>
													)}
													{media.mediaType === 'file' && (
														<a
															href={apiBaseUrl + media.mediaUrl}
															target='_blank'
															rel='noopener noreferrer'>
															Download File
														</a>
													)}
												</div>
											))}
											<div className='mt-6 flex items-center gap-2'>
												<p>{formatIsoTimeString(msg.createdAt ?? '')}</p>
												{msg.senderId === userData.id && (
													<Icon
														color={msg.seen ? 'blue' : 'zinc'}
														className='ml-auto'
														size='text-2xl'
														icon='HeroTwiceCheck'
													/>
												)}
											</div>
										</div>
									</div>
								))}
							</CardBody>
						</div>
					</div>
					<CardFooter className='rounded-full border !px-4 !py-1'>
						<CardFooterChild className='flex-1'>
							<input
								type='text'
								value={text}
								onChange={(e) => setText(e.target.value)}
								onKeyDown={handleKeyPress}
								placeholder='Type a message...'
								className='w-full rounded-full border p-2'
							/>
						</CardFooterChild>
						<CardFooterChild>
							<input type='file' multiple onChange={handleFileChange} />
							<Button onClick={sendMessage} variant='solid'>
								Send
							</Button>
						</CardFooterChild>
					</CardFooter>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default ChatPage;
