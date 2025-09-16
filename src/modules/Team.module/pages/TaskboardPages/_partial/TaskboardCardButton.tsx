import React from 'react';
import { JobStatus } from '../../../../../types/enums/jobStatus.enum';
import { JobStatusChangeModalPartial } from '../../../../Shared/common/JobsStatusChangeModal/Modal.partial';
import Button from '../../../../../components/ui/Button';
import { Roles } from '../../../../../constants/role.enums';
interface Props {
	cardType: JobStatus;
}

export const TaskboardCardButton: React.FC<Props> = ({ cardType }) => {
	const [modal, setModal] = React.useState(false);

	return (
		<>
			<Button
				onClick={() => setModal(true)}
				iconSize='text-8xl'
				className='mx-4 mt-2 max-w-full border-dashed'
				color='zinc'
				variant='outline'
				icon='HeroPlus'></Button>
			{modal && (
				<JobStatusChangeModalPartial
				modal={modal}
				module={Roles.TEAM}
					setModal={setModal}
					title={'Add Jobs to ' + cardType}
					changeStatusTo={cardType}
				/>
			)}
		</>
	);
};
