import Card, { CardBody } from '../../../../../components/ui/Card';
import Icon from '../../../../../components/icon/Icon';
import Tooltip from '../../../../../components/ui/Tooltip';
import Balance from '../../../../../components/Balance';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';

const Balance3Partial = () => {
	const { agencyStatistics } = useSelector((state: RootState) => state.teamDashboard);

	return (
		<Card>
			<CardBody>
				<div className='flex flex-col gap-2'>
					<div className='flex h-16 w-16 items-center justify-center rounded-full bg-amber-500'>
						<Icon icon='HeroRocketLaunch' size='text-3xl' className='text-white' />
					</div>
					<div className='space-x-1 text-zinc-500 rtl:space-x-reverse'>
						<span className='font-semibold'>In Interview</span>
						<Tooltip text='Number of candidate in interview.' />
					</div>
					<div className='text-4xl font-semibold'>
						{agencyStatistics.inInterview.count}
					</div>
					<div className='flex'>
						<Balance status='fixed' value={agencyStatistics.inInterview.change + '%'}>
							Balance
						</Balance>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance3Partial;
