import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { DateRangePicker, Range } from 'react-date-range';
import colors from 'tailwindcss/colors';
import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import ChartPartial from './_partial/Chart.partial';
import Balance1Partial from './_partial/Balance1.partial';
import Balance2Partial from './_partial/Balance2.partial';
import Balance3Partial from './_partial/Balance3.partial';
import Balance4Partial from './_partial/Balance4.partial';
import TimelinePartial from './_partial/Timeline.partial';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import PeriodAndDateRange from // getDefaultRangeForPeriod,
'../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import PartialLoader from '../../../../templates/layouts/main/PartialLoader';
import {
	getReportsAndAnalyticsChartData,
	getStatics,
} from '../../../../store/slices/Agency/ReportsAndAnalytics.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import { transformRAChartData } from '../../../../utils/chart.util';

const ReportAndAnalyticsPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const { loading, data, error } = useSelector(
		(state: RootState) => state.reportsAndAnalytics.statics,
	);

	const {
		loading: chartLoading,
		chartCategories,
		data: chartData,
		error: chartError,
	} = useSelector((state: RootState) => state.reportsAndAnalytics.chartData);

	const [activeTab, setActiveTab] = useState<TPeriod>(PERIOD.DAY);
	const [dateRange, setDateRange] = useState<any>({ startDate: '', endDate: '' });

	useEffect(() => {
		if(activeTab === PERIOD.RANGE){
			if(!dateRange.startDate || !dateRange.endDate) return
		}
		dispatch(
			getStatics({
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				period: activeTab.text.toLowerCase(),
			}),
		);
		dispatch(
			getReportsAndAnalyticsChartData({
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				period: activeTab.text.toLowerCase(),
			}),
		);
	}, [activeTab, dateRange]);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb
						path='Pages / Report and Analytics'
						currentPage='View Team Performance'
					/>
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Report and Analytics'>
				<PeriodAndDateRange
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					setDateRange={setDateRange}
				/>
				<PageLoader loading={loading} error={error} data={data}>
					<Container>
						<div className='grid grid-cols-12 gap-4'>
							<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
								<PartialLoader loading={loading} error={error} data={data}>
									<Balance1Partial data={data} />
								</PartialLoader>
							</div>
							<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
								<PartialLoader loading={loading} error={error} data={data}>
									<Balance2Partial data={data} />
								</PartialLoader>
							</div>
							<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
								<PartialLoader loading={loading} error={error} data={data}>
									<Balance3Partial data={data} />
								</PartialLoader>
							</div>
							<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
								<PartialLoader loading={loading} error={error} data={data}>
									<Balance4Partial data={data} />
								</PartialLoader>
							</div>

							<div className='col-span-12 xl:h-[600px] 2xl:col-span-8'>
								<PartialLoader
									loading={chartLoading}
									error={chartError}
									data={chartData}>
									<ChartPartial
										categories={chartCategories}
										chartData={transformRAChartData(chartData)}
									/>
								</PartialLoader>
							</div>
							<div className='col-span-12 2xl:col-span-4'>
								<TimelinePartial />
							</div>
						</div>
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default ReportAndAnalyticsPage;
