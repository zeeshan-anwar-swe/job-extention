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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getPaginatedTeamlist, setTeamMemberSearch } from '../../../../store/slices/Team.slice';
import InviteModalPartial from './_partial/InviteModal.partial';
import Pagination from '../../../../components/ui/Pagination';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import CustomSearchComponent from '../../components/CustomSearch.component';
import { getAgencyCandidatesList, setCandidatesSearch } from '../../../../store/slices/Candiates.slice';

const ManageTeamPage = () => {
	const { pageLoading, paginatedList, error, paginationCount, search } = useSelector(
		(state: RootState) => state.team,
	);
	const [modal, setModal] = useState<boolean>(false);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Manage Team' currentPage='Manage Your Team' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader className='!z-20'>
					<SubheaderLeft >
						<CustomSearchComponent
							setSearchActionForPagination={setTeamMemberSearch}
							searchListAction={getPaginatedTeamlist}
							searchLimit={10}
							searchByFilterOptions={['name', 'email']}
							placeholder='Search TeamMember...'
						/>
					</SubheaderLeft>
				</Subheader>
				<Subheader>
					<SubheaderLeft>
						<div>
							<CardTitle>Your Team</CardTitle>
							<CardSubTitle>Add, Remove, Assign Jobs to team members.</CardSubTitle>
						</div>
					</SubheaderLeft>
					<SubheaderRight>
						<Button onClick={() => setModal(true)} variant='solid' rightIcon='HeroPlus'>
							Add a Team Member
						</Button>
						<InviteModalPartial setModal={setModal} modal={modal} />
					</SubheaderRight>
				</Subheader>
				<PageLoader loading={pageLoading} error={error} data={paginatedList}>
					<Container>
						<div className=''>
							<TablePartial />
						</div>
					</Container>
				</PageLoader>
				<Pagination
					limit={10}
					search={search}
					count={paginationCount}
					getListAction={getPaginatedTeamlist}
				/>
			</PageWrapper>
		</>
	);
};

export default ManageTeamPage;
