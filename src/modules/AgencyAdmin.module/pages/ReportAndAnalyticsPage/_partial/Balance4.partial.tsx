import Card, { CardBody } from '../../../../../components/ui/Card';
import Icon from '../../../../../components/icon/Icon';
import Tooltip from '../../../../../components/ui/Tooltip';
import Balance from '../../../../../components/Balance';
import { JobsStatusType } from '../../../../../types/slices.type/agency/reportsAndAnalytics.slice.type';

const Balance4Partial = ({ data }: { data: JobsStatusType }) => {
	return (
		<Card>
			<CardBody>
				<div className='flex flex-col gap-2'>
					<div className='flex h-16 w-16 items-center justify-center rounded-full bg-violet-500'>
						<Icon icon='HeroClock' size='text-3xl' className='text-white' />
					</div>
					<div className='space-x-1 text-zinc-500 rtl:space-x-reverse'>
						<span className='font-semibold'>Pending Jobs</span>
						<Tooltip text='Number of hired candidates.' />
					</div>
					<div className='text-4xl font-semibold'>{data.pendingJobs.value}</div>
					<div className='flex'>
						<Balance status='negative' value={data.pendingJobs.change}>
							Balance
						</Balance>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance4Partial;
