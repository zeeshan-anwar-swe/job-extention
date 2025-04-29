import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import MessageItemPartial from './MessageItem.partial';

const MessagePartial = () => {
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Messages</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className=' flex h-96 flex-col gap-4 overflow-y-scroll'>
				<MessageItemPartial />
				<MessageItemPartial />
				<MessageItemPartial />
			</CardBody>
		</Card>
	);
};

export default MessagePartial;
