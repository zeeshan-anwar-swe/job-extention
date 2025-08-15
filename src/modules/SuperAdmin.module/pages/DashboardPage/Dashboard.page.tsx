import Balance1Partial from './_partial/Balance1.partial';
import Balance2Partial from './_partial/Balance2.partial';
import Balance3Partial from './_partial/Balance3.partial';
import Balance4Partial from './_partial/Balance4.partial';
import Container from '../../../../components/layouts/Container/Container';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import CommentPartial from './_partial/Comment.partial';
import ApexLineChartPartial from './_partial/ApexLineChart.partial';
import TablePartial from './_partial/Table.partial';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import PeriodAndDateRange from '../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial';
import { getAdminStatics } from '../../../../store/slices/SuperAdmin/Dashboard.slice';

const SuperAdminDashboardPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const [activeTab, setActiveTab] = useState<TPeriod>(PERIOD.MONTH);
	const [dateRange, setDateRange] = useState<any>({
		startDate: dayjs().format('YYYY-MM-DD'),
		endDate: '',
	});

	const { chartData, chartCategory, componentLoading, error } = useSelector(
		(state: RootState) => state.agencyStatics,
	);

	useEffect(() => {
		if (activeTab === PERIOD.RANGE) {
			if (!dateRange.startDate || !dateRange.endDate) return;
		}
		dispatch(
			getAdminStatics({
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
					<Breadcrumb path='Pages / Dashboard' currentPage='Sales' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Dashboard'>
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

						<div className='col-span-12 2xl:col-span-8'>
							<ApexLineChartPartial />
						</div>
						<div className='col-span-12 2xl:col-span-4'>
							<CommentPartial />
						</div>
						<div className='col-span-12 '>
							<TablePartial />
						</div>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SuperAdminDashboardPage;
