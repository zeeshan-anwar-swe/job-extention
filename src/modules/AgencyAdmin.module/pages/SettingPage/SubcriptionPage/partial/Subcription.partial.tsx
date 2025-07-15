import { Card } from 'antd';
import {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../../components/ui/Card';
import Badge from '../../../../../../components/ui/Badge';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import Button from '../../../../../../components/ui/Button';
import { Link } from 'react-router-dom';
import SubscriptionModalPartial from './SubscriptionModal.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import { formatString } from '../../../../../../utils/helper';
import { createPortalSession } from '../../../../../../services/stripe-subscriptions';

export const SubcriptionSectionPartial = () => {
	const { data } = useSelector((state: RootState) => state.subscription.userSubscription);

	const handleManageOrCancelOrUpdatePlan = async () => {
		const url = await createPortalSession();
		if (url) {
			window.location.href = url;
		}
	};

	return (
		<Card className='dark:bg-zinc-800 border-0'>
			<CardHeader className='rounded-xl bg-white dark:!bg-zinc-900'>
				<CardHeaderChild>
					<div>
						<div className='mb-2 flex items-center gap-2'>
							<h3>{formatString(data.subscription?.activePlan)}</h3>
							<Badge
								variant='solid'
								colorIntensity='100'
								className='text-blue-600 dark:bg-blue-600 dark:text-white'>
								Monthly
							</Badge>
						</div>
						<p className='dark:text-white'>Perfect for small to medium-sized businesses.</p>
					</div>
				</CardHeaderChild>
				<CardHeaderChild>
					<CardTitle className='text-5xl max-2xl:text-4xl max-xl:text-3xl dark:text-white'>
						{data.invoices[0]?.amount}{' '}
						<sub className='text-sm font-normal'>per month</sub>
					</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className=' bg-white py-4 dark:bg-zinc-900'>
				<div className='my-4 w-fit rounded-xl bg-zinc-100 p-4 dark:bg-zinc-950'>
					<h4>Next Payment</h4>
					<h2>{data.subscription?.currentPeriodEnd}</h2>
				</div>
			</CardBody>
			<div className='pb-2'>
				<NavSeparator />
			</div>
			<CardFooter>
				<CardFooterChild className='max-md:w-full'>
					<Button
						onClick={handleManageOrCancelOrUpdatePlan}
						className='max-md:!w-full'
						variant='outline'
						color='zinc'
						borderWidth='border'>
						Manage Plan
					</Button>

					<Button
						onClick={handleManageOrCancelOrUpdatePlan}
						className='max-md:!w-full'
						rightIcon='HeroArrowUpRight'
						variant='solid'>
						{data.subscription?.status === 'cancel_scheduled'
							? 'Reactivate Plan'
							: 'Upgrade Plan'}
					</Button>
				</CardFooterChild>
				<CardFooterChild className='max-md:w-full'>
					<SubscriptionModalPartial />
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};
