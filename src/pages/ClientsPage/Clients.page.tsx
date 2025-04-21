import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import Card, { CardBody, CardSubTitle, CardTitle } from '../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAgencyClientsList,
	getPaginatedAgencyClientsList,
} from '../../store/slices/Agency/Client.slice';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../components/ui/Dropdown';
import InviteModalPartial from './_partial/InviteModal.partial';
import PageLoader from '../../templates/layouts/main/PageLoader';
import Pagination from '../../components/ui/Pagination';

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

			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<SearchPartial />
						<Button
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroBarFilter'>
							Filter
						</Button>
					</SubheaderLeft>
				</Subheader>
				<Subheader>
					<SubheaderLeft>
						<div>
							<CardTitle>Clients</CardTitle>
							<CardSubTitle>View and manage your client relationships.</CardSubTitle>
							<div className='relative flex items-center'>
								<h6>Sort By</h6>
								<Dropdown>
									<DropdownToggle hasIcon={true}>
										<Button>{sortBy}</Button>
									</DropdownToggle>
									<DropdownMenu placement='bottom-end'>
										<div className='px-4 text-sm font-bold'>
											Select An Order
										</div>
										<DropdownItem onClick={() => setSortBy('Assending')}>
											Assending
										</DropdownItem>
										<DropdownItem onClick={() => setSortBy('Desending')}>
											Desending
										</DropdownItem>
										<DropdownItem onClick={() => setSortBy('New First')}>
											New First
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</div>
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
						<TablePartial />
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
