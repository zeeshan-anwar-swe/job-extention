import Card from '../../../../../../components/ui/Card';
import Button from '../../../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';
import Badge from '../../../../../../components/ui/Badge';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<Card className='!col-span-12 flex'>
			<div className='flex items-center justify-between px-4 py-2 max-md:flex-col max-md:items-start'>
				<div className='flex items-center gap-x-8'>
					<TableDataProfilePartial title='Dalia Benz' subTitle='dali@hotmail.com' />

					<Badge
						variant='solid'
						color='amber'
						colorIntensity='300'
						className='p-2  !text-amber-950'>
						53% Job Success
					</Badge>
				</div>
				<div className='flex justify-end gap-x-4 max-md:flex-col max-md:gap-2'>
					<Button onClick={() => setModal(true)} className='h-fit' variant='solid'>
						Assign a job
					</Button>
					<Button className='h-fit' variant='solid'>
						Send Message
					</Button>
				</div>
			</div>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
		</Card>
	);
};

export default HeaderPartial;
