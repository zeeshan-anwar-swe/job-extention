import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, { SubheaderLeft } from '../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../components/ui/Card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getTeamlist } from '../../store/slices/Team.slice';
import ShimmerEffectPageLoader from '../../components/layouts/PageLoader/ShimmerEffectPageLoader';
import InviteModalPartial from './_partial/InviteModal.partial';

const ManageTeamPage = () => {
	const { pageLoading } = useSelector((state: RootState) => state.team);
	const [modal, setModal] = useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (!modal) dispatch(getTeamlist());
	}, [modal]);
	return pageLoading ? (
		<ShimmerEffectPageLoader />
	) : (
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
				<Subheader>
					<SubheaderLeft>
						<Button
							borderWidth='border-2'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroUserGroup'>
							All Members
						</Button>
						<Button
							borderWidth='border-2'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroArrowsUpDown'>
							Sort By
						</Button>
					</SubheaderLeft>
				</Subheader>
				<Container className='!grid !grid-cols-12 !gap-4'>
					<div className='col-span-12 '>
						<Card className='h-full'>
							<>
								<CardHeader>
									<CardHeaderChild className=''>
										<div>
											<CardTitle>Your Team</CardTitle>
											<p>Add, Remove, Assign Jobs to team members.</p>
										</div>
									</CardHeaderChild>
									<CardHeaderChild>
										<Button
											onClick={() => setModal(true)}
											variant='solid'
											rightIcon='HeroPlus'>
											Add a Team Member
										</Button>
										<InviteModalPartial setModal={setModal} modal={modal} />
									</CardHeaderChild>
								</CardHeader>
								<CardBody className='overflow-auto'>
									<TablePartial />
								</CardBody>
							</>
						</Card>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default ManageTeamPage;
