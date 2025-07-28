import React from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../../components/ui/Card';
import Label from '../../../../../../components/form/Label';
import CustomBadgePartial from './CustomBadge.partial';
import LabelTitlepartial from './LabelTitle.partial';

const ReviewCardPartial = () => {
	return (
		<Card>
			<CardHeader className='flex-col !items-start !gap-2'>
				<CardTitle>Review</CardTitle>
				<CardHeaderChild>Please set the status and review about candidate.</CardHeaderChild>
			</CardHeader>
			<CardBody className='flex flex-col gap-4'>
				<div className='flex items-center justify-start gap-2'>
					<Label className='!m-0 !w-fit  !p-0 text-xl' htmlFor='RCStatus'>
						Status:
					</Label>
					<CustomBadgePartial title='Fair' />
				</div>
				<LabelTitlepartial placeholder='Comments about the Candidate' />
			</CardBody>
		</Card>
	);
};

export default ReviewCardPartial;
