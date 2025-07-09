import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ChartPartial from './_partial/Chart.partial';
import { useDispatch, useSelector } from 'react-redux';
import Balance1Partial from './_partial/Balance1.partial';
import Balance2Partial from './_partial/Balance2.partial';
import Balance3Partial from './_partial/Balance3.partial';
import Balance4Partial from './_partial/Balance4.partial';
import { AppDispatch, RootState } from '../../../../store';
import { transLineChartData } from '../../../../utils/chart.util';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import Container from '../../../../components/layouts/Container/Container';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import PeriodAndDateRange from '../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial';
import { getTeamChartData, getTeamStatics } from '../../../../store/slices/Team/TeamDashboard.slice';
import MessagePartial from './_partial/Messages.partial';

const TeamDashboardPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const [activeTab, setActiveTab] = useState<TPeriod>(PERIOD.MONTH);
	const [dateRange, setDateRange] = useState<any>({
		startDate: dayjs().format('YYYY-MM-DD'),
		endDate: '',
	});

	const { chartData, chartCategory, componentLoading, error } = useSelector(
		(state: RootState) => state.teamDashboard,
	);

	useEffect(() => {
		if (activeTab === PERIOD.RANGE) {
			if (!dateRange.startDate || !dateRange.endDate) return;
		}
		dispatch(
			getTeamStatics({
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				period: activeTab.text.toLowerCase(),
			}),
		);
		dispatch(
			getTeamChartData({
				period: activeTab.text.toLowerCase(),
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
			}),
		);
	}, [activeTab, dateRange]);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Dashboard' currentPage='Dashboard' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Sales Dashboard'>
				<PeriodAndDateRange
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					setDateRange={setDateRange}
				/>
				<Container>
					<div className='grid grid-cols-12 gap-4'>
						<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
							<Balance1Partial />
						</div>
						<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
							<Balance2Partial />
						</div>
						<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
							<Balance3Partial />
						</div>
						<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
							<Balance4Partial />
						</div>

						<div className='col-span-12 overflow-hidden rounded-xl xl:h-[500px] 2xl:col-span-8'>
							<PageLoader loading={componentLoading} data={chartData} error={error}>
								<ChartPartial
									categories={chartCategory}
									series={transLineChartData(chartData)}
								/>
							</PageLoader>
						</div>
						<div className='col-span-12 2xl:col-span-4'>
							<MessagePartial />
						</div> 
						{/* <div className=' col-span-12 2xl:col-span-4'>
							<CommentPartial />
						</div> */}

						{/* <div className='col-span-12 2xl:col-span-8'>
							<Card className='h-full'>
								<TablePartial />
							</Card>
						</div>
						*/}
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default TeamDashboardPage;
