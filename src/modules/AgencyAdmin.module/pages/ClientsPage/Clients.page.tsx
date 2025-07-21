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
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import {
	getPaginatedAgencyClientsList,
	setClientSearch,
} from '../../../../store/slices/Agency/Client.slice';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/ui/Dropdown';
import InviteModalPartial from './_partial/InviteModal.partial';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../components/ui/Pagination';
import CustomSearchComponent from '../../components/CustomSearch.component';

const ClientsPage = () => {
	const [sortBy, setSortBy] = useState<string>('Default');
	const [modal, setModal] = useState<boolean>(false);
	const { paginatedClients, paginationCount, pageLoading, error } = useSelector(
		(state: RootState) => state.clients,
	);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Clents' currentPage='Manage Client' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>

			<PageWrapper name='Clients'>
				<Subheader>
					<SubheaderLeft>
						<CustomSearchComponent
							searchLimit={10}
							placeholder='Search clients...'
							searchByFilterOptions={['name', 'email']}
							setSearchActionForPagination={setClientSearch}
							searchListAction={getPaginatedAgencyClientsList}
						/>
					</SubheaderLeft>
				</Subheader>
				<Subheader className='!-z-0'>
					<SubheaderLeft className='!block'>
						<CardTitle>Clients</CardTitle>
						<CardSubTitle>View and manage your client relationships.</CardSubTitle>
					</SubheaderLeft>
					<SubheaderRight>
						<Button
							onClick={() => setModal(true)}
							variant='solid'
							rightIcon='HeroPaperAirplane'>
							Invite a Client
						</Button>
						<InviteModalPartial setModal={setModal} modal={modal} />
					</SubheaderRight>
				</Subheader>

				<PageLoader loading={pageLoading} error={error} data={paginatedClients}>
					<Container>
						<div className='relative mb-4 flex items-center'>
							<h6>Sort By</h6>
							<Dropdown>
								<DropdownToggle hasIcon={true}>
									<Button>{sortBy}</Button>
								</DropdownToggle>
								<DropdownMenu placement='bottom-end'>
									<div className='px-4 text-sm font-bold'>Select An Order</div>
									<DropdownItem onClick={() => setSortBy('Assending')}>
										Assending
									</DropdownItem>
									<DropdownItem onClick={() => setSortBy('Desending')}>
										Desending
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
						<TablePartial sortBy={sortBy} />
					</Container>
				</PageLoader>
				<Pagination
					count={paginationCount}
					limit={10}
					getListAction={getPaginatedAgencyClientsList}
				/>
			</PageWrapper>
		</>
	);
};

export default ClientsPage;
