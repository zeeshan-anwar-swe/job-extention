import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../../../../components/ui/Button';
import Container from '../../../../../components/layouts/Container/Container';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../../../components/ui/Card';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import Badge from '../../../../../components/ui/Badge';
import TablePartial from './partial/Table.partial';
import SubscriptionModalPartial from './partial/SubscriptionModal.partial';
import SettingAside from '../partial/Asides/DefaultAside.template';
import { Link } from 'react-router-dom';
import { SubcriptionSectionPartial } from './partial/Subcription.partial';
import { SubcriptionCardPartial } from './partial/SubcriptionCard.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import { useEffect } from 'react';
import {
	getSubscriptionPlan,
	getUserSubscription,
} from '../../../../../store/slices/Subcription.slice';
import { TSubcriptionPlan } from '../../../../../types/slices.type/subcription.slice.type';

const SubcriptionPage = () => {
	const dispatch: AppDispatch = useDispatch();

	const { loading, data, error } = useSelector(
		(state: RootState) => state.subscription.userSubscription,
	);
	const {
		loading: spLoading,
		data: spData,
		error: spError,
	} = useSelector((state: RootState) => state.subscription.subscriptionPlans);

	useEffect(() => {
		dispatch(getUserSubscription());
		dispatch(getSubscriptionPlan());
	}, []);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Setting' currentPage='Subscription' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<PageLoader
					loading={loading || spLoading}
					error={error || spError}
					data={data.subscription || spData}>
					<Container className='!grid flex-1 !grid-cols-12 !gap-4 overflow-hidden'>
						<Card className='col-span-12 !grid flex-1 !grid-cols-10 gap-4  p-4'>
							<SettingAside />
							<Card className='col-span-8 gap-4 !bg-zinc-100 p-4 dark:!bg-zinc-950 max-md:col-span-12 '>
								{data.subscription ? (

									<SubcriptionSectionPartial />
								) : (
									<section className='grid grid-cols-2 gap-4'>
										{spData.map((subcriptionPlan: TSubcriptionPlan) => (
											<SubcriptionCardPartial
												subcriptionPlan={subcriptionPlan}
												key={subcriptionPlan.id}
											/>
										))}
									</section>
								)}

								<Card className='!bg-transparent'>
									<CardHeader>
										<CardHeaderChild>
											<h3>Billing and invoicing</h3>
										</CardHeaderChild>
										{/* <CardHeaderChild>
											<Button
												variant='outline'
												borderWidth='border'
												color='zinc'
												icon='HeroDocumentArrowDown'>
												Download all
											</Button>
										</CardHeaderChild> */}
									</CardHeader>
									<CardBody className=' overflow-x-scroll rounded-xl bg-white py-4 dark:bg-zinc-900'>
										<TablePartial />
									</CardBody>
								</Card>
							</Card>
						</Card>
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default SubcriptionPage;
