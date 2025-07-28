import { useState } from 'react';
import Card from '../../../../../../components/ui/Card';
import AssignJobModalPartial from './AssignJob.partial';
import Button from '../../../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<Card className='!col-span-12 flex'>
			<div className='flex items-center justify-between px-4 py-2 max-md:flex-col max-md:items-start'>
				<TableDataProfilePartial title='Dalia Benz' subTitle='dali@hotmail.com' />
				<div className='flex justify-end gap-x-4 max-md:flex-col max-md:gap-2'>
					<Button
						className='font-medium !text-amber-900'
						variant='solid'
						color='amber'
						colorIntensity='200'>
						53% Hiring Percentage
					</Button>

					<Button variant='solid'>Send Message</Button>
					<Button color='red' variant='solid'>
						Remove Member
					</Button>
				</div>
			</div>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
		</Card>
	);
};

export default HeaderPartial;
