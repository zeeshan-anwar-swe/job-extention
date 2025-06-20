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
import { assignTeamToClient, getPaginatedTeamlist } from '../../../../store/slices/Team.slice';
import { TeamMemberType } from '../../../../types/slices.type/team/team.slice.type';

export const AssignTeamModalListItemPartial = ({
	team,
	assignTo,
}: {
	assignToModule: 'candidate' | 'client' | 'teamMember';
	team: TeamMemberType;
	assignTo: string;
	jobAssignAction: any;
}) => {
	const [loading, setLoading] = React.useState(false);
	const isAssigned = team.clientIds.includes(assignTo);

	const dispatch: AppDispatch = useDispatch();

	const { loading: loadingImage, imageUrl } = useImageValidation(team?.user?.image);

	const handleAssignTeamToClient = async () => {
		if (isAssigned) return;
		setLoading(true);
		await dispatch(assignTeamToClient({ teamId: team.id, clientId: assignTo }));
		await dispatch(getPaginatedTeamlist({ limit: 10, page: 1 }));
		setLoading(false);
	};

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
					<Button
						isLoading={loading}
						rightIcon={isAssigned ? 'HeroTwiceCheck	' : undefined}
						color={isAssigned ? 'emerald' : 'blue'}
						onClick={handleAssignTeamToClient}
						variant='solid'>
						{isAssigned ? 'Assigned' : 'Assign'}
					</Button>
				</CardHeaderChild>
			</CardHeader>
		</Card>
	);
};
