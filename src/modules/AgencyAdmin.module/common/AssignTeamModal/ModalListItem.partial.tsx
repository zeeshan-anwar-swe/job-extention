import React from 'react';
import Button from '../../../../components/ui/Button';
import { JobDetailsType2 } from '../../../../types/slices.type/jobs.slice.type';
import { textValidationCheck } from '../../../../utils/validationCheck';
import { AppDispatch } from '../../../../store';
import { useDispatch } from 'react-redux';
import Tooltip from '../../../../components/ui/Tooltip';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import useImageValidation from '../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../components/ui/ImageLoaderWraper';
import { assignTeamToClient } from '../../../../store/slices/Team.slice';

export const AssignTeamModalListItemPartial = ({
	team,
	assignTo,
	jobAssignAction,
	assignToModule,
}: {
	assignToModule: 'candidate' | 'client' | 'teamMember';
	team: any;
	assignTo: string;
	jobAssignAction: any;
}) => {
	const [loading, setLoading] = React.useState(false);
	const [selfAssign, setSelfAssign] = React.useState(false);
	// const isAssigned =
	// 	assignToModule === 'candidate'
	// 		? job.appliedCandidates?.some((candidate: any) => candidate.candidateId === assignTo) ||
	// 			selfAssign
	// 		: assignToModule === 'client'
	// 			? job?.client?.id === assignTo || selfAssign
	// 			: job?.team?.id === assignTo || selfAssign;

	const dispatch: AppDispatch = useDispatch();
	// const handleAssignJob = async () => {
	// 	if (isAssigned) return;
	// 	setLoading(true);
	// 	await dispatch(jobAssignAction({ assignTo, jobId: job.id }));
	// 	setSelfAssign(true);
	// 	setLoading(false);
	// };

	const { loading: loadingImage, imageUrl } = useImageValidation(team?.user?.image);

	const handleAssignTeamToClient = async ()=>{
		setLoading(true);
		await dispatch(assignTeamToClient({teamId: team.id, clientId: assignTo}));
		setLoading(false);
	}

	return (
		<Card className='border'>
			<CardHeader>
				<CardHeaderChild>
					<ImageLoaderWraper loading={loadingImage} height='h-14'>
						<img
							className='aspect-square w-14 rounded-full object-cover'
							src={imageUrl}
							alt=''
						/>
					</ImageLoaderWraper>
					<CardSubTitle className='font-medium'>{team?.user?.name}</CardSubTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<Button onClick={handleAssignTeamToClient} variant='solid'>
						Assign
					</Button>
				</CardHeaderChild>
			</CardHeader>
		</Card>
	);
};
