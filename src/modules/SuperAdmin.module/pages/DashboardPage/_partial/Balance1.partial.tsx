import Card, { CardBody } from '../../../../../components/ui/Card';
import Icon from '../../../../../components/icon/Icon';
import Tooltip from '../../../../../components/ui/Tooltip';
import Button from '../../../../../components/ui/Button';
import Balance from '../../../../../components/Balance';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';

const Balance1Partial = () => {
	const { adminStatistics } = useSelector((state: RootState) => state.adminStatics);

	return (
		<Card>
			<CardBody>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-500'>
							<Icon icon='HeroDocumentText' size='text-3xl' className='text-white' />
						</div>
						<Button
							size='sm'
							rounded='rounded-full'
							variant='outline'
							borderWidth='border'
							color='zinc'>
							View All
						</Button>
					</div>
					<div className='space-x-1 text-zinc-500 rtl:space-x-reverse'>
						<span className='font-semibold'>Jobs Posted</span>
						<Tooltip text='Total number of posted jobs.' />
					</div>
					<div className='flex justify-between'>
						<div className='text-4xl font-semibold'>{adminStatistics.jobsPosted.value}</div>
						<Balance status='positive' value={adminStatistics.jobsPosted.change} />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance1Partial;
