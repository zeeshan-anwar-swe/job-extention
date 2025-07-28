import CommentPartial from './Comment.partial';
import ClientsMetrics from './ClientsMetrics.partial';
import Card, { CardBody } from '../../../../../components/ui/Card';

const TimelinePartial = () => {
	return (
		<Card className='h-full'>
			<CardBody className='h-96 overflow-scroll'>
				<CommentPartial />
				<ClientsMetrics />
			</CardBody>
		</Card>
	);
};

export default TimelinePartial;
