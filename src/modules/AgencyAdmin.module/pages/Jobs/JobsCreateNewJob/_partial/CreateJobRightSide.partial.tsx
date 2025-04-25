import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../../../components/ui/Card';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import SearchPartial from './Search.partial';
import CandidateCardPartial from './CandidateCard.partial';
import JobFilterDropdownPartial from './JobFilterDropdown.partial';
import { AppDispatch, RootState } from '../../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import MainLoader from '../../../../../../templates/layouts/main/MainLoader';
import { getAllCandidatesList } from '../../../../../../store/slices/Candiates.slice';
import Pagination from '../../../../../../components/ui/Pagination';

const CreateJobRightSidePartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const { allCadidateList, filteredCandidate, paginationCount, pageLoading, error } = useSelector(
		(state: RootState) => state.candidates,
	);

	const isFiltered = filteredCandidate.length>0

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
			<CardBody className='flex h-[450px] flex-col gap-4 overflow-y-scroll'>
				<MainLoader loading={pageLoading} error={error} data={isFiltered ? filteredCandidate : allCadidateList}>
					{
						(!isFiltered? allCadidateList: filteredCandidate).map((candidate) => (
							<CandidateCardPartial key={candidate.id} candidate={candidate} />
						))}
				</MainLoader>
				{/* <ScrollablePagination count={paginationCount} loadMoreAction={getAllCandidatesList} initialLimit={10}/> */}
			</CardBody>
			<CardFooter>
				<Pagination count={paginationCount} getListAction={getAllCandidatesList} limit={10}/>
			</CardFooter>
		</Card>
	);
};

export default CreateJobRightSidePartial;
