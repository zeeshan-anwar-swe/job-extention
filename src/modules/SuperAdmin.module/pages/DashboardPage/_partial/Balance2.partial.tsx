import Card, { CardBody } from '../../../../../components/ui/Card';

import Icon from '../../../../../components/icon/Icon';
import Button from '../../../../../components/ui/Button';
import Balance from '../../../../../components/Balance';
import { RootState } from '../../../../../store';
import { useSelector } from 'react-redux';

const Balance2Partial = () => {
	const { adminStatistics } = useSelector((state: RootState) => state.adminStatics);
	return (
		<Card>
			<CardBody>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500'>
							<Icon icon='HeroUser' size='text-3xl' className='text-white' />
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
						<span className='font-semibold'>Successful Jobs</span>
					</div>
					<div className='flex justify-between'>
						<div className='text-4xl font-semibold'>{adminStatistics.successJobs.value}</div>
						<Balance status='positive' value={adminStatistics.successJobs.change} />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance2Partial;
