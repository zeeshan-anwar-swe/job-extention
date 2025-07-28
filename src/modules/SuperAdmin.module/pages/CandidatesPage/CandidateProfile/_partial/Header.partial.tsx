import Card from '../../../../../../components/ui/Card';
import Button from '../../../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<Card className='col-span-12 flex'>
			<div className='flex items-center justify-between px-4 py-2 max-lg:flex-col max-lg:items-start max-lg:gap-4	'>
				<TableDataProfilePartial title='Dalia Benz' subTitle='dali@hotmail.com' />

				<div className='flex justify-end gap-x-4 max-md:w-full max-sm:flex-col max-sm:gap-y-4 '>
					<Button className='h-fit max-md:w-full' variant='solid'>
						Send Message
					</Button>
					<Button className='h-fit max-md:w-full' variant='solid' color='red'>
						Remove Member
					</Button>
				</div>
			</div>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
		</Card>
	);
};

export default HeaderPartial;
