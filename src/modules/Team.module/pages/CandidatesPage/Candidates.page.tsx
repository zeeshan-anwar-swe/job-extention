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
import { CandidateJobStatus } from '../../../../types/enums/candidateJobStatus.enum';
import { getLabedOptionFromEnum } from '../../../../utils/enum.helper';
import CustomSearchComponent from '../../../Shared/components/CustomSearch.component';
import { CustomFilterDropdownComponent } from '../../../Shared/components/CustomFilterDropdown.component';
import { getTeamCandidates, setSearch } from '../../../../store/slices/Team/Candidates.slice';

const CandidatesPage = () => {
	const { loading, rows, error, count, search } = useSelector(
		(state: RootState) => state.teamCandidates.list,
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
							setSearchActionForPagination={setSearch}
							searchListAction={getTeamCandidates}
							searchLimit={10}
						/>
						<CustomFilterDropdownComponent
							limit={10}
							filterBy='status'
							search={search}
							setSearch={setSearch}
							getListAction={getTeamCandidates}
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
					loading={loading}
					error={error}
					data={rows}
					messageForEmptyData='No candidates data found'>
					<Container>
						<TablePartial />
					</Container>
				</PageLoader>

				<Pagination
					search={search}
					getListAction={getTeamCandidates}
					count={count}
					limit={10}
				/>
			</PageWrapper>
		</>
	);
};

export default CandidatesPage;
