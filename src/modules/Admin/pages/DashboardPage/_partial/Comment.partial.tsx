import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';

import CommentItemPartial from './CommentItem.partial';

const CommentPartial = () => {
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Client Feedback</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<div className='flex flex-col gap-4'>
					<CommentItemPartial name='John Doe' />
					<CommentItemPartial name='Kairene Smith' isSubscribed={true} />
					<CommentItemPartial name='John Doe' />
					<CommentItemPartial name='Kairene Smith' isSubscribed={true} />
					<CommentItemPartial name='John Doe' />
					<CommentItemPartial name='Kairene Smith' isSubscribed={true} />
				</div>
			</CardBody>
		</Card>
	);
};

export default CommentPartial;
