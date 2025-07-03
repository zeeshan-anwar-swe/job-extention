import { useDispatch, useSelector } from 'react-redux';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import { RootState } from '../../../../../store';
import MessageItemPartial from './MessageItem.partial';
import { Message } from '../../../../../types/slices.type/chat/chat.slice.type';
import { getChatData } from '../../../../../store/slices/Chat.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../../components/ui/Pagination';
import { useEffect, useState } from 'react';
import { InboxEntry } from '../../../../../context/socketContext';
import { useAuth } from '../../../../../context/authContext';

const MessagePartial = () => {
	const { userStorage } = useAuth();

	const { loading, rows, error, count } = useSelector((state: RootState) => state.chat.chatData);

	const [inbox, setInbox] = useState<Record<string, InboxEntry>>({});
	const inboxMessages = inbox ? Object.values(inbox) : [];


	useEffect(() => {
		if (rows.length > 0) {
			const result: Record<string, InboxEntry> = {};
			for (const entry of rows) {
				const isSender = entry.senderId === userStorage?.id;
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
		}
	}, [rows]);

	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Messages</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className=' flex h-96 flex-col gap-4 overflow-y-scroll'>
				<PageLoader loading={loading} error={error} data={rows}>
					{inboxMessages.map((chatRow: any, index) => (
						<MessageItemPartial chatRow={chatRow} key={index} />
					))}
				</PageLoader>
			</CardBody>
			<CardFooter>
				<Pagination limit={10} count={count} getListAction={getChatData} />
			</CardFooter>
		</Card>
	);
};

export default MessagePartial;
