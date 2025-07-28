import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, { SubheaderLeft } from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import { useState } from 'react';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import InviteModalPartial from './_partial/AssignJob.partial';

const AdminPage = () => {
	const [sortBy, setSortBy] = useState<string>('Sort By');
	const [modal, setModal] = useState<boolean>(false);
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Admin' currentPage='Manage Admin' />
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
							iconSize='text-5xl'
							rightIcon='HeroMicrophone'
							borderWidth='border'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='CustomKoalaHead'>
							Search with KoalaByte Talking Avatar
						</Button>
						<Button
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroBarFilter'>
							Filter
						</Button>
					</SubheaderLeft>
				</Subheader>
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
									</div>
								</CardHeaderChild>
								<CardHeaderChild>
									<Dropdown className='rounded-full border'>
										<DropdownToggle hasIcon={true}>
											<Button>{sortBy}</Button>
										</DropdownToggle>
										<DropdownMenu placement='bottom-end'>
											<div className=' p-4 text-sm font-bold'>
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
									<Button
										onClick={() => setModal(true)}
										variant='solid'
										rightIcon='HeroPaperAirplane'>
										Invite an Admin
									</Button>
									<InviteModalPartial modal={modal} setModal={setModal} />
								</CardHeaderChild>
							</CardHeader>
							<CardBody className='overflow-auto'>
								<TablePartial />
							</CardBody>
						</Card>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default AdminPage;
