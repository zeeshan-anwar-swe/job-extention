
import { AppDispatch } from '../../../../store';
import { useDispatch } from 'react-redux';
import Card, {
	CardHeader,
} from '../../../../components/ui/Card';
import { FC } from 'react';
import Button from '../../../../components/ui/Button';
import Tooltip from '../../../../components/ui/Tooltip';
import { textValidationCheck } from '../../../../utils/validationCheck';

interface Props {
	job: any;
	setJobIds: any;
	jobIds: string[];
}

export const JobsStatusChangeModalListItem:FC<Props> = ({job, setJobIds, jobIds}) => {

	const isChanged = jobIds.includes(job.id);
	
	const handleJobStatusChange = () => {
		if (jobIds.includes(job.id)) {
			setJobIds(jobIds.filter((id) => id !== job.id));
		} else {
			setJobIds([...jobIds, job.id]);
		}
	};
	

	return (
		<div className='flex items-center justify-between gap-4 rounded-xl border pr-2'>
			<div className='flex items-center gap-4'>
				<Button icon='HeroBriefcase' className='h-fit'></Button>
				<div className=''>
					<div className='flex items-center gap-2'>
						{job?.title?.length > 20 ? (
							<Tooltip className='dark:bg-zinc-800' text={job?.title ?? ''}>
								<h5 className='m-0 p-0'>
									{textValidationCheck(job?.title.slice(0, 20))}...
								</h5>
							</Tooltip>
						) : (
							<h5 className='m-0 p-0'>
								{textValidationCheck(job?.title.slice(0, 15))}
							</h5>
						)}
						
					</div>
					<p>June 13, 2024</p>
				</div>
					
			</div>
			<Button rightIcon={isChanged ? 'HeroTwiceCheck' : 'HeroPlus'} color={isChanged ? 'emerald' : "blue"} onClick={handleJobStatusChange} variant='solid'>
				{isChanged ? 'Unselect' : 'Select'}
			</Button>
		</div>
	);
};
