import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, { SubheaderLeft } from '../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAgencyClientsList } from '../../store/slices/Agency/Client.slice';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../components/ui/Dropdown';
import InviteModalPartial from './_partial/InviteModal.partial';
import PageLoader from '../../templates/layouts/main/PageLoader';

const ClientsPage = () => {
	const [sortBy, setSortBy] = useState<string>('Default');
	const [modal, setModal] = useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();
	const { clientsList, pageLoading, error } = useSelector((state: RootState) => state.clients);

	useEffect(() => {
		dispatch(getAgencyClientsList());
	}, []);
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
				<PageLoader loading={pageLoading} error={error} data={clientsList}>
					<Container className='!grid !grid-cols-12 !gap-4'>
						<div className='col-span-12 '>
							<Card className='h-full'>
								<CardHeader>
									<CardHeaderChild className=''>
										<div>
											<CardTitle>Clients</CardTitle>
											<CardSubTitle>
												View and manage your client relationships.
											</CardSubTitle>
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
														<DropdownItem
															onClick={() => setSortBy('Assending')}>
															Assending
														</DropdownItem>
														<DropdownItem
															onClick={() => setSortBy('Desending')}>
															Desending
														</DropdownItem>
														<DropdownItem
															onClick={() => setSortBy('New First')}>
															New First
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</div>
										</div>
									</CardHeaderChild>
									<CardHeaderChild>
										<Button
											onClick={() => setModal(true)}
											variant='solid'
											rightIcon='HeroPaperAirplane'>
											Invite a Client
										</Button>
										<InviteModalPartial setModal={setModal} modal={modal} />
									</CardHeaderChild>
								</CardHeader>
								<CardBody className='overflow-auto'>
									<TablePartial />
								</CardBody>
							</Card>
						</div>
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default ClientsPage;
