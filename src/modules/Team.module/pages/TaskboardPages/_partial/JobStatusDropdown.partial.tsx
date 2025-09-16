import { useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../components/ui/Dropdown';
import Button from '../../../../../components/ui/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { changeJobStatus } from '../../../../../store/slices/Jobs.slice';
import {
	getTeamTaskBoardBackLogJobs,
	getTeamTaskBoardCompletedJobs,
	getTeamTaskBoardInProgressJobs,
	getTeamTaskBoardInReviewJobs,
} from '../../../../../store/slices/Agency/Taskboard.slice';
import { TaskBoardJobType } from '../../../../../types/slices.type/agency/taskboard.slice.type';
import { JobStatus } from '../../../../../types/enums/jobStatus.enum';

const JobStatusDropdownPartial = ({ item }: { item: TaskBoardJobType }) => {
	const [dropdown, setDropdown] = useState<boolean>(false);

	const dispatch: AppDispatch = useDispatch();

	const handleJobStatusChange = async (status: JobStatus) => {
		console.log({ currentStatus: item.status, newStatus: status });

		if (item.status !== status) {
			await dispatch(changeJobStatus({ jobId: item.id, status }));

			//first check if the current status is backlog
			if (item.status === JobStatus.BACKLOG) {
				dispatch(getTeamTaskBoardBackLogJobs({ page: 1, limit: 10 }));
				if (status === JobStatus.IN_PROGRESS) {
					dispatch(getTeamTaskBoardInProgressJobs({ page: 1, limit: 10 }));
				} else if (status === JobStatus.IN_REVIEW) {
					dispatch(getTeamTaskBoardInReviewJobs({ page: 1, limit: 10 }));
				} else {
					dispatch(getTeamTaskBoardCompletedJobs({ page: 1, limit: 10 }));
				}

				// Second check if the current status is in progress
			}

			// Second check if the current status is in progress
			else if (item.status === JobStatus.IN_PROGRESS) {
				dispatch(getTeamTaskBoardInProgressJobs({ page: 1, limit: 10 }));

				if (status === JobStatus.BACKLOG) {
					dispatch(getTeamTaskBoardBackLogJobs({ page: 1, limit: 10 }));
				} else if (status === JobStatus.IN_REVIEW) {
					dispatch(getTeamTaskBoardInReviewJobs({ page: 1, limit: 10 }));
				} else {
					dispatch(getTeamTaskBoardCompletedJobs({ page: 1, limit: 10 }));
				}
			}

			// Third check if the current status is in review
			else if (item.status === JobStatus.IN_REVIEW) {
				dispatch(getTeamTaskBoardInReviewJobs({ page: 1, limit: 10 }));

				if (status === JobStatus.BACKLOG) {
					dispatch(getTeamTaskBoardBackLogJobs({ page: 1, limit: 10 }));
				} else if (status === JobStatus.IN_PROGRESS) {
					dispatch(getTeamTaskBoardInProgressJobs({ page: 1, limit: 10 }));
				} else {
					dispatch(getTeamTaskBoardCompletedJobs({ page: 1, limit: 10 }));
				}
			}

			// Fourth check if the current status is completed
			else if (item.status === JobStatus.COMPLETED) {
				dispatch(getTeamTaskBoardCompletedJobs({ page: 1, limit: 10 }));
				if (status === JobStatus.BACKLOG) {
					dispatch(getTeamTaskBoardBackLogJobs({ page: 1, limit: 10 }));
				} else if (status === JobStatus.IN_PROGRESS) {
					dispatch(getTeamTaskBoardInProgressJobs({ page: 1, limit: 10 }));
				} else {
					dispatch(getTeamTaskBoardInReviewJobs({ page: 1, limit: 10 }));
				}
			}
		}
	};

	return (
		<Dropdown>
			<DropdownToggle isOpen={dropdown} hasIcon={false} setIsOpen={setDropdown}>
				<Button icon='HeroEllipsisHorizontal' />
			</DropdownToggle>
			<DropdownMenu placement='bottom-end'>
				<div className='px-4 text-sm font-bold'>Change Status</div>
				<DropdownItem className='gap-2'>
					<Button
						onClick={() => handleJobStatusChange(JobStatus.BACKLOG)}
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'BACKLOG' ? 'solid' : 'outline'}
						color={item.status === 'BACKLOG' ? 'amber' : 'zinc'}>
						Backlog
					</Button>
					<Button
						onClick={() => handleJobStatusChange(JobStatus.IN_PROGRESS)}
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'IN_PROGRESS' ? 'solid' : 'outline'}
						color={item.status === 'IN_PROGRESS' ? 'blue' : 'zinc'}>
						In Progress
					</Button>
				</DropdownItem>
				<DropdownItem className='gap-2'>
					<Button
						onClick={() => handleJobStatusChange(JobStatus.IN_REVIEW)}
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'IN_REVIEW' ? 'solid' : 'outline'}
						color={item.status === 'IN_REVIEW' ? 'violet' : 'zinc'}>
						In Review
					</Button>
					<Button
						onClick={() => handleJobStatusChange(JobStatus.COMPLETED)}
						className='!py-1'
						rounded='rounded-full'
						variant={item.status === 'COMPLETED' ? 'solid' : 'outline'}
						color={item.status === 'COMPLETED' ? 'emerald' : 'zinc'}>
						Completed
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default JobStatusDropdownPartial;
