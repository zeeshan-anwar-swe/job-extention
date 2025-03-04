import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';
import Badge from '../../../../components/ui/Badge';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<Card className='!col-span-12 flex'>
			<div className='flex items-center justify-between px-4 py-2 max-md:flex-col max-md:items-start'>
				<TableDataProfilePartial title='Dalia Benz' subTitle='dali@hotmail.com' />
				<div className='flex flex-wrap justify-end gap-x-4 max-md:gap-2 max-sm:w-full'>
					<Badge
						variant='solid'
						color='amber'
						colorIntensity='300'
						className='!text-amber-950 max-md:p-2  max-sm:w-full'>
						53% Hiring Percentage
					</Badge>
					<Button
						onClick={() => setModal(true)}
						className='h-fit max-sm:w-full'
						variant='solid'>
						Assign a job
					</Button>
				</div>
			</div>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
		</Card>
	);
};

export default HeaderPartial;
