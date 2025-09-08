import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import ChartPartial from './_partial/Chart.partial';
import TablePartial from './_partial/Table.partial';
import Balance1Partial from './_partial/Balance1.partial';
import Balance2Partial from './_partial/Balance2.partial';
import Balance3Partial from './_partial/Balance3.partial';
import Balance4Partial from './_partial/Balance4.partial';
import MessagePartial from './_partial/Messages.partial';

import CommentPartial from './_partial/Comment.partial';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card from '../../../../components/ui/Card';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAgencyStatics, getChartData } from '../../../../store/slices/Agency/Statics.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import { transLineChartData } from '../../../../utils/chart.util';
import PeriodAndDateRange from '../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial';


const DashboardPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const [activeTab, setActiveTab] = useState<TPeriod>(PERIOD.MONTH);
	const [dateRange, setDateRange] = useState<any>({ startDate: dayjs().format('YYYY-MM-DD'), endDate: '' });

	

	const { chartData, chartCategory, componentLoading, error } = useSelector(
		(state: RootState) => state.agencyStatics,
	);


	useEffect(() => {
		if(activeTab === PERIOD.RANGE){
			if(!dateRange.startDate || !dateRange.endDate) return
		}
		dispatch(
			getAgencyStatics({
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				period: activeTab.text.toLowerCase(),
			}), 
		);
		dispatch(
			getChartData({
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
						<div className=' col-span-12 2xl:col-span-4'>
							<CommentPartial />
						</div>

						<div className='col-span-12 2xl:col-span-8'>
							<Card className='h-full'>
								<TablePartial />
							</Card>
						</div>
						<div className='col-span-12 2xl:col-span-4'>
							<MessagePartial />
						</div>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default DashboardPage;
