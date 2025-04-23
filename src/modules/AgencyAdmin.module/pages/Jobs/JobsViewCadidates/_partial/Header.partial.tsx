import Card from '../../../../../../components/ui/Card';
import Button from '../../../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';

const HeaderPartial = () => {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<Card className='flex'>
			<div className='flex items-center justify-between px-4 py-2'>
				<TableDataProfilePartial title='Dalia Benz' subTitle='dali@hotmail.com' />
				<div className='flex justify-end gap-x-4'>
					<Button onClick={() => setModal(true)} className='h-fit' variant='solid'>
						Assign to a job
					</Button>
					<Button rightIcon='HeroPaperAirplane' className='h-fit' variant='solid'>
						Send To ATS
					</Button>
					<Button
						rightIcon='HeroPencilSquare'
						className='h-fit'
						variant='outline'
						color='zinc'>
						Edit CV
					</Button>
					<Button
						rightIcon='HeroArrowDown'
						className='h-fit'
						variant='outline'
						color='zinc'>
						Download
					</Button>
				</div>
			</div>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
		</Card>
	);
};

export default HeaderPartial;
