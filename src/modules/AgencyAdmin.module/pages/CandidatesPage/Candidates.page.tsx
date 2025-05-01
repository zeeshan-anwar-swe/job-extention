import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import { CardSubTitle, CardTitle } from '../../../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import {
	getAgencyCandidatesList,
	setCandidatesSearch,
} from '../../../../store/slices/Candiates.slice';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../components/ui/Pagination';
import DownloadCsvComponent from './_partial/CSVDownload.partial';
import DownloadCsvModal from './_partial/CSVDownload.partial';
import { useState } from 'react';
import CustomSearchComponent from '../../components/CustomSearch.component';

const CandidatesPage = () => {
	const { pageLoading, candidatesList, error, paginationCount, search } = useSelector(
		(state: RootState) => state.candidates,
	);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Candidates' currentPage='Candidates' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>

			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<CustomSearchComponent
							setSearchActionForPagination={setCandidatesSearch}
							searchListAction={getAgencyCandidatesList}
							searchLimit={10}
							placeholder='Search Candidates...'
						/>
						<Button
							variant='outline'
							color='zinc'
							rounded='rounded-full'
							icon='HeroBarFilter'>
							Filter
						</Button>
					</SubheaderLeft>
				</Subheader>
				<Subheader>
					<SubheaderLeft>
						<CardTitle>Candidates</CardTitle>
						<CardSubTitle>View, manage, and track Candidates.</CardSubTitle>
					</SubheaderLeft>
					<SubheaderRight>
						<Button onClick={() => setIsOpen(true)} variant='solid'>
							Download CSV
						</Button>
						<DownloadCsvModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
					</SubheaderRight>
				</Subheader>

				<PageLoader
					loading={pageLoading}
					error={error}
					data={candidatesList}
					messageForEmptyData='No candidates data found kindly create a job and assign candidates while creating it'>
					<Container>
						<TablePartial />
					</Container>
				</PageLoader>

				<Pagination
					search={search}
					getListAction={getAgencyCandidatesList}
					count={paginationCount}
					limit={10}
				/>
			</PageWrapper>
		</>
	);
};

export default CandidatesPage;
