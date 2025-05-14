import Card, { CardBody } from '../../../../../components/ui/Card';
import Tooltip from '../../../../../components/ui/Tooltip';
import Balance from '../../../../../components/Balance';
import Icon from '../../../../../components/icon/Icon';
import { JobsStatusType } from '../../../../../types/slices.type/agency/reportsAndAnalytics.slice.type';

const Balance2Partial = ({ data }: { data: JobsStatusType }) => {
	return (
		<Card>
			<CardBody>
				<div className='flex flex-col gap-2'>
					<div className='flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500'>
						<Icon icon='HeroUserPlus' size='text-3xl' className='text-white' />
					</div>
					<div className='space-x-1 text-zinc-500 rtl:space-x-reverse'>
						<span className='font-semibold'>Total Hirings</span>
						<Tooltip text='Number of shortlisted candidates.' />
					</div>
					<div className='text-4xl font-semibold'>{data.totalHirings}</div>
					<div className='flex'>
						<Balance status='negative' value='41%'>
							Balance
						</Balance>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance2Partial;
