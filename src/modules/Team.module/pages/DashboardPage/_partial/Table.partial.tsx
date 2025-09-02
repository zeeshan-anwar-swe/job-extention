import Button from '../../../../../components/ui/Button';
import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import SearchPartial from './Search.partial';
import TableDataPartial from './TableData.partial';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import { useEffect } from 'react';
import {
	getSearchedAgencyCandidatesList,
	setCandidatesSearch,
} from '../../../../../store/slices/Candiates.slice';
import { TableRowPartial } from './TableRow.partial';
import { TCandidateListItem } from '../../../../../types/slices.type/candidate.slice.type';
import CustomSearchComponent from '../../../../Shared/components/CustomSearch.component';

const TablePartial = () => {
	const { candidatesList, pageLoading, error, search } = useSelector(
		(state: RootState) => state.candidates,
	);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getSearchedAgencyCandidatesList({ limit: 5, page: 1 }));
	}, []);

	return (
		<>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Candidates</CardTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<CustomSearchComponent
						placeholder='Search Candidates...'
						searchLimit={5}
						setSearchActionForPagination={setCandidatesSearch}
						searchListAction={getSearchedAgencyCandidatesList}
					/>
					<Link to={'/dashboard/candidates'}>
						<Button variant='solid'>View All Candidates</Button>
					</Link>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='overflow-auto'>
				<PageLoader loading={pageLoading} error={error} data={candidatesList}>
					<Table className='table-fixed max-md:min-w-[70rem]'>
						<THead>
							<Tr>
								<Th>NAME</Th>
								<Th>POSITION</Th>
								<Th>STATUS</Th>
							</Tr>
						</THead>
						<TBody>
							{candidatesList.map((candidate: TCandidateListItem) => (
								<TableRowPartial candidate={candidate} key={candidate.id} />
							))}
						</TBody>
						<TFoot>
							<Tr>
								<Th>NAME</Th>
								<Th>POSITION</Th>
								<Th>STATUS</Th>
							</Tr>
						</TFoot>
					</Table>
				</PageLoader>
			</CardBody>
		</>
	);
};

export default TablePartial;
