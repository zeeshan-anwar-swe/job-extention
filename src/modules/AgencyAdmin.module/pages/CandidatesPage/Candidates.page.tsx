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
import {
	getAgencyCandidatesList,
	setCandidatesSearch,
} from '../../../../store/slices/Candiates.slice';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../components/ui/Pagination';
import DownloadCsvModal from './_partial/CSVDownload.partial';
import { useState } from 'react';
import CustomSearchComponent from '../../components/CustomSearch.component';
import { CustomFilterDropdownComponent } from '../../components/CustomFilterDropdown.component';
import { CandidateJobStatus } from '../../../../types/enums/candidateJobStatus.enum';
import { getLabedOptionFromEnum } from '../../../../utils/enum.helper';

const CandidatesPage = () => {
	const { pageLoading, candidatesList, error, paginationCount, search } = useSelector(
		(state: RootState) => state.candidates,
	);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const statuses = Object.values(CandidateJobStatus);
	console.log(typeof CandidateJobStatus);

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
						/>
						<CustomFilterDropdownComponent
							limit={10}
							filterBy='status'
							search={search}
							setSearch={setCandidatesSearch}
							getListAction={getAgencyCandidatesList}
							options={getLabedOptionFromEnum(CandidateJobStatus)}
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
					messageForEmptyData='No candidates data found'>
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
