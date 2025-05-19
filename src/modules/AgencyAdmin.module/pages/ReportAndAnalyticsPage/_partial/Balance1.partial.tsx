import Icon from '../../../../../components/icon/Icon';
import Balance from '../../../../../components/Balance';
import Tooltip from '../../../../../components/ui/Tooltip';
import Card, { CardBody } from '../../../../../components/ui/Card';
import { JobsStatusType } from '../../../../../types/slices.type/agency/reportsAndAnalytics.slice.type';

const Balance1Partial = ({ data }: { data: JobsStatusType }) => {
	return (
		<Card>
			<CardBody className='!h-full'>
				<div className='flex flex-col gap-2'>
					<div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-500'>
						<Icon icon='HeroDocument' size='text-3xl' className='text-white' />
					</div>
					<div className='space-x-1 text-zinc-500 rtl:space-x-reverse'>
						<span className='font-semibold'>Jobs Applied</span>
						<Tooltip text='Total number of new jobs.' />
					</div>
					<div className='text-4xl font-semibold'>{data.jobsApplied.value}</div>
					<div className='flex'>
						<Balance status='positive' value={data.jobsApplied.change}>
							Balance
						</Balance>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance1Partial;
