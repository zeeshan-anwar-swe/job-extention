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
import { assignClientToCandidate } from '../../../../store/slices/Candiates.slice';


export const AssignClientModalListItemPartial = ({
	candidate,
	assignTo,
}: {
	candidate: any;
	assignTo: string;
}) => {
	const [loading, setLoading] = React.useState(false);
	

	const dispatch: AppDispatch = useDispatch();

	const { loading: loadingImage, imageUrl } = useImageValidation(team?.user?.image);

	const handleAssignTeamToClient = async ()=>{
		setLoading(true);
		await dispatch(assignClientToCandidate({clientId: client,  assignTo}));
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
