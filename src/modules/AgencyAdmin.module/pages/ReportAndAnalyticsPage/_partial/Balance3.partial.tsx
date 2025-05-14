import Card, { CardBody } from '../../../../../components/ui/Card';
import Icon from '../../../../../components/icon/Icon';
import Tooltip from '../../../../../components/ui/Tooltip';
import Balance from '../../../../../components/Balance';
import { JobsStatusType } from '../../../../../types/slices.type/agency/reportsAndAnalytics.slice.type';

const Balance3Partial = ({ data }: { data: JobsStatusType }) => {
	return (
		<Card>
			<CardBody>
				<div className='flex flex-col gap-2'>
					<div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-500'>
						<Icon icon='HeroUserMinus' size='text-3xl' className='text-white' />
					</div>
					<div className='space-x-1 text-zinc-500 rtl:space-x-reverse'>
						<span className='font-semibold'>Rejected Jobs</span>
						<Tooltip text='Number of candidate in interview.' />
					</div>
					<div className='text-4xl font-semibold'>{data.rejectedJobs}</div>
					<div className='flex'>
						<Balance status='fixed' value='0%'>
							Balance
						</Balance>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance3Partial;
