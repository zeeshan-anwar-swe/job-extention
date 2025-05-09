import { useDispatch, useSelector } from 'react-redux';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import { AppDispatch, RootState } from '../../../../../store';
import MessageItemPartial from './MessageItem.partial';
import { ChatRow } from '../../../../../types/slices.type/chat/chat.slice.type';
import { useEffect } from 'react';
import { getChatData } from '../../../../../store/slices/Chat.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../../components/ui/Pagination';

const MessagePartial = () => {
	const { loading, rows, error, count } = useSelector((state: RootState) => state.chat.chatData);

	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Messages</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className=' flex h-96 flex-col gap-4 overflow-y-scroll'>
				<PageLoader loading={loading} error={error} data={rows}>
					{rows.map((chatRow: ChatRow) => (
						<MessageItemPartial chatRow={chatRow} key={chatRow.id} />
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
