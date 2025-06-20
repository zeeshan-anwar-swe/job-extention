import { useEffect, useState, useContext, ChangeEvent, FC, KeyboardEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useAuth } from '../../../../context/authContext';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../../../components/layouts/Container/Container';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import Button from '../../../../components/ui/Button';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import Label from '../../../../components/form/Label';
import Icon from '../../../../components/icon/Icon';
import Alert from '../../../../components/ui/Alert';
import { formatIsoTimeString, formatTimeString } from '../../../../utils/helper';
import { Image } from 'antd';
import { ViewableImagePartial } from './_partial/Image.partial';

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
	createdAt: string;
	seen?: boolean;
}

interface AuthContextType {
	userData: {
		id: string;
	};
}

const ReusableChatPage = ({
	receiverId: userId,
	receiverName,
}: {
	receiverId: string;
	receiverName: string;
}) => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	const { userStorage: userData, userTokenStorage } = useAuth();
	// const { userId } = useParams<{ userId: string }>();
	const [chat, setChat] = useState<ChatMessage[]>([]);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [text, setText] = useState<string>('');
	const [files, setFiles] = useState<File[]>([]);

	const token = userTokenStorage;

	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		if (!token || !userData?.id) return;

		// Initialize socket connection
		socketRef.current = io(apiBaseUrl, {
			auth: { token },
		});

		socketRef.current.on('receive_message', (message: ChatMessage) => {
			if (
				(message.senderId === userData.id && message.receiverId === userId) ||
				(message.receiverId === userData.id && message.senderId === userId)
			) {
				setChat((prev) => [...prev, message]);
			}
		});

		return () => {
			socketRef.current?.disconnect();
			socketRef.current = null;
		};
	}, [token, userId]);

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

	// Send message function
	const sendMessage = async () => {
		setLoading(true);
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

		socketRef.current?.emit('send_message', message);
		// setChat((prev) => [...prev, message]);
		setText('');
		setFiles([]);
		setLoading(false);
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
							<h1>{receiverName}</h1>
							<div className='flex items-center gap-2'>
								<SearchPartial />
								<Button variant='outline' onClick={() => setChat([])}>
									Clear Chat
								</Button>
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
										className={`flex ${msg.senderId === userData.id ? 'justify-end ' : 'justify-start'}`}>
										<div
											className={`max-w-[70%] rounded-md ${msg.senderId === userData.id ? 'bg-blue-100 ' : 'bg-zinc-100'} p-3 shadow-md`}>
											<strong>
												{msg.senderId === userData.id
													? 'You'
													: receiverName}
												:
											</strong>
											<div>
												{msg.text && <p>{msg.text}</p>}
												{msg.media?.map((media, idx) => (
													<div key={idx} className='mt-2 w-96'>
														{media.mediaType === 'image' && (
															<ViewableImagePartial
																url={media.mediaUrl}
																height='h-64'
															/>
														)}
														{media.mediaType === 'video' && (
															<video
																src={apiBaseUrl + media.mediaUrl}
																controls
																className='aspect-video w-64 rounded-lg'
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
																<Button
																	rightIcon='HeroArrowDown'
																	variant='solid'>
																	Download File
																</Button>
															</a>
														)}
													</div>
												))}
												<div className='mt-6 flex items-center gap-2'>
													<p>{formatIsoTimeString(msg.createdAt)}</p>
													<Icon
														color={msg.seen ? 'blue' : 'zinc'}
														className='ml-auto'
														size='text-2xl'
														icon='HeroTwiceCheck'
													/>
												</div>
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
							<div className='flex items-center gap-4'>
								<Label className='!m-0 !p-0' htmlFor='chatFile'>
									<Icon color='zinc' size='text-2xl' icon='HeroPaperClip' />
								</Label>
								{files.length > 0 && (
									<Alert icon='HeroDocument' iconSize='text-2xl'>
										<h1 className='text-2xl text-inherit'>{files.length}</h1>
									</Alert>
								)}
								<input
									id='chatFile'
									className='hidden'
									type='file'
									multiple
									onChange={handleFileChange}
								/>
								<Button
									isLoading={loading}
									rightIcon='HeroPaperAirplane'
									onClick={sendMessage}
									variant='solid'>
									Send
								</Button>
							</div>
						</CardFooterChild>
					</CardFooter>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default ReusableChatPage;
