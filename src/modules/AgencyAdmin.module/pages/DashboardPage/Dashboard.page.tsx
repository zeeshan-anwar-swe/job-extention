import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { DateRangePicker, Range } from 'react-date-range';
import colors from 'tailwindcss/colors';
import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import ChartPartial from './_partial/Chart.partial';
import TablePartial from './_partial/Table.partial';
import Balance1Partial from './_partial/Balance1.partial';
import Balance2Partial from './_partial/Balance2.partial';
import Balance3Partial from './_partial/Balance3.partial';
import Balance4Partial from './_partial/Balance4.partial';
import MessagePartial from './_partial/Timeline.partial';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import CommentPartial from './_partial/Comment.partial';
import PeriodButtonsPartial from './_partial/PeriodButtons.partial';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import Button from '../../../../components/ui/Button';
import themeConfig from '../../../../config/theme.config';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card from '../../../../components/ui/Card';
import { formatDateStringToYYYYMMDD } from '../../../../utils/helper';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAgencyStatics, getChartData } from '../../../../store/slices/Agency/Statics.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import { transLineChartData } from '../../../../utils/chart.util';
import PeriodAndDateRange, { getDefaultRangeForPeriod } from '../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial';

const DashboardPage = () => {
	const { i18n } = useTranslation();
	const dispatch: AppDispatch = useDispatch();
	const [activeTab, setActiveTab] = useState<TPeriod>(PERIOD.DAY);
	const [dateRange, setDateRange] = useState<Range>(getDefaultRangeForPeriod(PERIOD.DAY));

	const { chartData, componentLoading, error } = useSelector(
		(state: RootState) => state.agencyStatics,
	);





	useEffect(() => {
		dispatch(
			getAgencyStatics({
				startDate: formatDateStringToYYYYMMDD(dateRange.startDate),
				endDate: formatDateStringToYYYYMMDD(dateRange.endDate),
				period: activeTab.text.toLowerCase(),
			}),
		);
		dispatch(
			getChartData({
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
			<PageWrapper name='Sales Dashboard'>
				
				<PeriodAndDateRange activeTab={activeTab} setActiveTab={setActiveTab} dateRange={dateRange} setDateRange={setDateRange} />
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
							<PageLoader
								loading={componentLoading}
								data={chartData}
								error={error}>
								<ChartPartial
									series={transLineChartData(chartData)}
									period={activeTab}
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
