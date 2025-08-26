import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import Card, {
	CardBody,
	CardTitle,
	CardHeader,
	CardSubTitle,
	CardHeaderChild,
} from '../../../../../../components/ui/Card';
import {
	getAllCandidatesList,
	getMoreAllCandidatesList,
	LinkedInProfile,
	setCandidatesFilterOptions,
} from '../../../../../../store/slices/Candiates.slice';
import CandidateCardPartial from './CandidateCard.partial';
import JobFilterDropdownPartial from './JobFilterDropdown.partial';
import MainLoader from '../../../../../../templates/layouts/main/MainLoader';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import { CursorBasePagination } from '../../../../../../components/ui/CusrorBasePagination';
import SearchPartial from '../../../../../Shared/common/assignLinkedInCandiatesToJobModal/Search.partial';
import { useEffect } from 'react';

const CreateJobRightSidePartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const { next, allCadidateList, filteredCandidate, filterOptions, pageLoading, error } =
		useSelector((state: RootState) => state.candidates);

	const isFiltered = filteredCandidate?.length > 0;

	useEffect(() => {
		dispatch(getAllCandidatesList({ page: 1, limit: 10, filterOptions }));
	}, []);

	return (
		<Card className='relative col-span-4 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader>
				<CardHeaderChild className='!block'>
					<CardTitle>Assign Candidates</CardTitle>
					<CardSubTitle>Add Candidates to the Job</CardSubTitle>
				</CardHeaderChild>
				<CardHeaderChild className='!flex w-full !gap-2'>
					<div className='flex-1'>
						<SearchPartial
							placeholder='Search Candidate...'
							filterOptions={filterOptions}
							searchListAction={getAllCandidatesList}
							setFilterOptions={setCandidatesFilterOptions}
							searchLimit={10}
						/>
					</div>
					<JobFilterDropdownPartial />
				</CardHeaderChild>
			</CardHeader>

			<NavSeparator className='!mx-4 mb-4' />
			<CardBody className='flex h-[450px] flex-col gap-4 overflow-y-scroll'>
				<MainLoader
					error={error}
					loading={pageLoading}
					data={isFiltered ? filteredCandidate : allCadidateList}>
					{(!isFiltered ? allCadidateList : filteredCandidate).map(
						(candidate: LinkedInProfile) => (
							<CandidateCardPartial key={candidate.id} candidate={candidate} />
						),
					)}
				</MainLoader>
				{!pageLoading && (
					<CursorBasePagination
						limit={10}
						use={next.use}
						nextPage={next.page}
						cursor={next.unipileCursor}
						filterOptions={filterOptions}
						getMoreListAction={getMoreAllCandidatesList}
					/>
				)}
			</CardBody>
		</Card>
	);
};

export default CreateJobRightSidePartial;
