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

const SubcriptionPage = () => {
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
			<PageWrapper name='Subscription'>
				<Container className='!grid flex-1 !grid-cols-12 !gap-4'>
					<Card className='col-span-12 !grid flex-1 !grid-cols-10 gap-4 overflow-hidden p-4'>
						<SettingAside />
						<Card className='col-span-8 gap-4 !bg-zinc-100 p-4 dark:!bg-zinc-950 max-md:col-span-12 '>
							<Card>
								<CardHeader className='rounded-t-xl bg-white dark:!bg-zinc-900'>
									<CardHeaderChild>
										<div>
											<div className='mb-2 flex items-center gap-2'>
												<h3>Pro Plan</h3>
												<Badge
													variant='solid'
													colorIntensity='100'
													className='text-blue-600 dark:bg-blue-600 dark:text-white'>
													Monthly
												</Badge>
											</div>
											<p>Perfect for small to medium-sized businesses.</p>
										</div>
									</CardHeaderChild>
									<CardHeaderChild>
										<h1 className='text-5xl font-semibold'>
											$50 <sub className='text-sm font-normal'>per month</sub>
										</h1>
									</CardHeaderChild>
								</CardHeader>
								<CardBody className=' bg-white py-4 dark:bg-zinc-900'>
									<div className='my-4 w-fit rounded-xl bg-zinc-100 p-4 dark:bg-zinc-950'>
										<h4>Next Payment</h4>
										<h2>November 30, 2025</h2>
									</div>
								</CardBody>
								<div className='pb-2'>
									<NavSeparator />
								</div>
								<CardFooter>
									<CardFooterChild className='max-md:w-full'>
										<Button
											className='max-md:!w-full'
											variant='outline'
											color='zinc'
											borderWidth='border'>
											Manage Plan
										</Button>
										<Link to='/payment'>
											<Button
												className='max-md:!w-full'
												rightIcon='HeroArrowUpRight'
												variant='solid'>
												Upgrade Plan
											</Button>
										</Link>
									</CardFooterChild>
									<CardFooterChild className='max-md:w-full'>
										<SubscriptionModalPartial />
									</CardFooterChild>
								</CardFooter>
							</Card>

							<Card className='!bg-transparent'>
								<CardHeader>
									<CardHeaderChild>
										<h3>Billing and invoicing</h3>
									</CardHeaderChild>
									<CardHeaderChild>
										<Button
											variant='outline'
											borderWidth='border'
											color='zinc'
											icon='HeroDocumentArrowDown'>
											Download all
										</Button>
									</CardHeaderChild>
								</CardHeader>
								<CardBody className=' overflow-x-scroll rounded-xl bg-white py-4 dark:bg-zinc-900'>
									<TablePartial />
								</CardBody>
							</Card>
						</Card>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SubcriptionPage;
