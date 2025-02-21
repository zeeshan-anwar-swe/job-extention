import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import Breadcrumb from '../../../components/layouts/Breadcrumb/Breadcrumb';
import DefaultHeaderRightCommon from '../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../../components/ui/Button';
import Container from '../../../components/layouts/Container/Container';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../components/ui/Card';
import SettingAside from './partial/Asides/DefaultAside.template';
import LabelTitlepartial from './partial/LabelTitle.partial';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import Badge from '../../../components/ui/Badge';

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
			<PageWrapper name='Candidates'>
				<Container className='!grid flex-1 !grid-cols-12 !gap-4'>
					<Card className='col-span-12 !grid flex-1 !grid-cols-10 gap-4 overflow-hidden p-4'>
						<SettingAside />
						<Card className='col-span-8 gap-4 !bg-zinc-100 p-4 dark:!bg-zinc-950 '>
							<Card>
								<CardHeader className='rounded-xl bg-white dark:!bg-zinc-800'>
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
								<CardBody className=' bg-white py-4 dark:bg-zinc-800'>
									<div className='my-4 w-fit rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900'>
										<h4>Next Payment</h4>
										<h2>November 30, 2025</h2>
									</div>
								</CardBody>
								<div className='px-2 pb-2'>
									<NavSeparator />
								</div>
								<CardFooter>
									<CardFooterChild>
										<Button variant='outline' color='zinc' borderWidth='border'>
											Manage Plan
										</Button>
										<Button rightIcon='HeroArrowUpRight' variant='solid'>
											Upgrade Plan
										</Button>
									</CardFooterChild>
									<CardFooterChild>
										<Button
											rightIcon='HeroExclamationCircle'
											variant='outline'
											color='red'
											borderWidth='border'>
											Cancel membership
										</Button>
									</CardFooterChild>
								</CardFooter>
							</Card>
							<Card>
								<CardHeader className='rounded-xl bg-white dark:!bg-zinc-800'>
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
								<CardBody className=' bg-white py-4 dark:bg-zinc-800'>
									<div className='my-4 w-fit rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900'>
										<h4>Next Payment</h4>
										<h2>November 30, 2025</h2>
									</div>
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
