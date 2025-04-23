import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import Button from '../../../../../components/ui/Button';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import { JobDetailsType } from '../../../../../types/slices.type/jobs.slice.type';
import { assignJobToClient } from '../../../../../store/slices/Agency/Client.slice';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';

const AssignJobModalListItemPartial = ({
	job,
	client,
}: {
	job: JobDetailsType;
	client: ClientListItemType;
}) => {
	const [loading, setLoading] = React.useState(false);

	const dispatch: AppDispatch = useDispatch();
	const handleAssign = async () => {
		setLoading(true);
		await dispatch(assignJobToClient({ clientId: client.id, jobId: job.id }));
		setLoading(false);
	};
	return (
		<div className='flex items-center justify-between gap-4 rounded-xl border pr-2'>
			<div className='flex gap-4'>
				<Button icon='HeroFolder' className='h-fit'></Button>
				<div className=''>
					<div className='flex items-center gap-2'>
						<h5 className='m-0 p-0'>{textValidationCheck(job?.title)}</h5>
						<span>|</span>
						<span>{textValidationCheck(job?.experience)} </span>
						<span>|</span>
						<span>{textValidationCheck(job?.location)}</span>
					</div>
					<p>June 13, 2024</p>
				</div>
			</div>

			<Button isLoading={loading} onClick={handleAssign} className='h-fit' variant='solid'>
				Assign
			</Button>
		</div>
	);
};

export default AssignJobModalListItemPartial;
