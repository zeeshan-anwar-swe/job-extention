import Card, { CardBody } from '../../../../../components/ui/Card';

import CommentPartial from './TeamPeformance.partial';
import ClientsMetrics from './ClientsMetrics.partial';

const TimelinePartial = () => {
	return (
		<Card className='h-full'>
			<CardBody className='flex flex-col gap-4 h-[500px] overflow-scroll'>
				<CommentPartial />
				<ClientsMetrics />
			</CardBody>
		</Card>
	);
};

export default TimelinePartial;
