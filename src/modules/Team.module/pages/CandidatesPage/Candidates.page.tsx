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
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../components/ui/Pagination';
import DownloadCsvModal from './_partial/CSVDownload.partial';
import { useState } from 'react';
import CustomSearchComponent from '../../../Shared/components/CustomSearch.component';
import { getTeamCandidates, setSearch } from '../../../../store/slices/Team/Candidates.slice';

const TeamCandidatesPage = () => {
	const {
		loading: pageLoading,
		error,
		rows: candidatesList,
		count: paginationCount,
		search,
	} = useSelector((state: RootState) => state.teamCandidates.list);
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
							setSearchActionForPagination={setSearch}
							searchListAction={getTeamCandidates}
							searchLimit={10}
							searchByFilterOptions={[
								'name',
								'email',
								'status',
								'jobTitle',
								'clientName',
								'clientEmail',
							]}
							placeholder='Search Candidates...'
						/>
					</SubheaderLeft>
					<SubheaderRight>
						<div></div>
					</SubheaderRight>
				</Subheader>
				<Subheader className='!-z-0'>
					<SubheaderLeft className='!block'>
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
					getListAction={getTeamCandidates}
					count={paginationCount}
					limit={10}
				/>
			</PageWrapper>
		</>
	);
};

export default TeamCandidatesPage;
