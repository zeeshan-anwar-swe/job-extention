import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import SearchPartial from './Search.partial';
import CandidateCardPartial from './CandidateCard.partial';
import JobFilterDropdownPartial from './JobFilterDropdown.partial';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCandidatesList } from '../../../../store/slices/Candiates.slice';
import MainLoader from '../../../../templates/layouts/main/MainLoader';
import { getClientsList } from '../../../../store/slices/Agency/Client.slice';

const CreateJobRightSidePartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const { candidatesList, pageLoading, error } = useSelector(
		(state: RootState) => state.candidates,
	);

	useEffect(() => {
		dispatch(getClientsList());
	}, []);
	return (
		<Card className='relative col-span-4 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader>
				<CardHeaderChild className='!block'>
					<CardTitle>Assign Candidates</CardTitle>
					<CardSubTitle>Add Candidates to the Job</CardSubTitle>
				</CardHeaderChild>
				<CardHeaderChild className='!flex w-full !justify-between'>
					<SearchPartial />
					<JobFilterDropdownPartial />
				</CardHeaderChild>
			</CardHeader>

			<NavSeparator className='!mx-4 mb-4' />
			<CardBody className='flex max-h-[600px] flex-col gap-4 overflow-y-scroll'>
				<MainLoader loading={pageLoading} error={error} data={candidatesList}>
					{!pageLoading &&
						candidatesList.map((candidate) => (
							<CandidateCardPartial key={candidate.id} candidate={candidate} />
						))}
				</MainLoader>
			</CardBody>
		</Card>
	);
};

export default CreateJobRightSidePartial;
