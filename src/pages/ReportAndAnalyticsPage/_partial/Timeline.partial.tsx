import React from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../components/ui/Card';

import CommentPartial from './Comment.partial';
import ClientsMetrics from './ClientsMetrics.partial';

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
