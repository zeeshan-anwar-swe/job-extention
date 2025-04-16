import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';

import AssignJobModalPartial from './AssignJob.partial';
import AssignJobToClientModalPartial from './AssignJobToClientModal.partial';
import { AssignClientToCandidateModalPartial } from '../../_partial/AssignJobToClientModal.partial';

const HeaderPartial = ({ state }: any) => {
	console.log({ state });

	const [modal, setModal] = useState<boolean>(false);
	const [clientModal, setClientModal] = useState<boolean>(false);
	const navgiateTo = useNavigate();
	return (
		<Card className='flex'>
			<div className='flex items-center justify-between !gap-2 px-4 py-2 max-xl:flex-col max-xl:items-start'>
				<TableDataProfilePartial
					title={state?.candidate?.name}
					subTitle={state?.candidate?.email}
				/>
				<div className='flex flex-wrap justify-end gap-x-4 max-xl:justify-start max-xl:gap-2'>
					<Button
						onClick={() => setClientModal(true)}
						className='h-fit max-sm:w-full'
						variant='solid'>
						Assign to a Client
					</Button>
					<Button
						onClick={() => setModal(true)}
						className='h-fit max-sm:w-full'
						variant='solid'>
						Assign to a job
					</Button>
					<Button
						rightIcon='HeroPaperAirplane'
						className='h-fit max-sm:w-full'
						variant='solid'>
						Send To ATS
					</Button>
					<Button
						onClick={() => navgiateTo('/candidates/cv-edit/12')}
						rightIcon='HeroPencilSquare'
						className='h-fit max-sm:w-full'
						variant='outline'
						color='zinc'>
						Edit CV
					</Button>
					<Button
						rightIcon='HeroArrowDown'
						className='h-fit max-sm:w-full'
						variant='outline'
						color='zinc'>
						Download
					</Button>
				</div>
			</div>
			<AssignJobModalPartial setModal={setModal} modal={modal} />
			<AssignClientToCandidateModalPartial modal={clientModal} setModal={setClientModal} />
		</Card>
	);
};

export default HeaderPartial;
