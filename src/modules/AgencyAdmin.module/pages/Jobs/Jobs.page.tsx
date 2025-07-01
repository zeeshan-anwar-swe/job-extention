import Container from '../../../../components/layouts/Container/Container';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import { CardSubTitle, CardTitle } from '../../../../components/ui/Card';
import JobsPageCardPartial from './_partial/JobsPageCard.partial';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import { DateRangePicker, Range } from 'react-date-range';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import colors from 'tailwindcss/colors';
import themeConfig from '../../../../config/theme.config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getJobsList, setJobSearch } from '../../../../store/slices/Jobs.slice';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../components/ui/Pagination';
import CustomSearchComponent from '../../components/CustomSearch.component';
import { Link } from 'react-router-dom';
import PeriodAndDateRange from '../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial';

const JobsPage = () => {
	const { i18n } = useTranslation();
	const [dateRange, setDateRange] = useState<any>({ startDate: '', endDate: '' });

	const { pageLoading, error, paginatedList, paginationCount, search } = useSelector(
		(state: RootState) => state.jobsSlice,
	);

	const [activeTab, setActiveTab] = useState<TPeriod>(PERIOD.MONTH);

	const [selectedDate, setSelectedDate] = useState<Range[]>([
		{
			startDate: dayjs().startOf('month').add(-1, 'month').toDate(),
			endDate: dayjs().endOf('month').toDate(),
			key: 'selection',
		},
	]);

	useEffect(() => {
		if (activeTab === PERIOD.DAY) {
			setSelectedDate([
				{
					startDate: dayjs().startOf('day').toDate(),
					endDate: dayjs().endOf('day').toDate(),
					key: 'selection',
				},
			]);
		}
		if (activeTab === PERIOD.WEEK) {
			setSelectedDate([
				{
					startDate: dayjs().startOf('week').toDate(),
					endDate: dayjs().endOf('week').toDate(),
					key: 'selection',
				},
			]);
		}
		if (activeTab === PERIOD.MONTH) {
			setSelectedDate([
				{
					startDate: dayjs().startOf('month').toDate(),
					endDate: dayjs().endOf('month').toDate(),
					key: 'selection',
				},
			]);
		}
		return () => {};
	}, [activeTab]);

	useEffect(() => {
		const selectedStart = dayjs(selectedDate[0].startDate).format('LL');
		const selectedEnd = dayjs(selectedDate[0].endDate).format('LL');

		if (
			selectedStart === dayjs().startOf('day').format('LL') &&
			selectedEnd === dayjs().endOf('day').format('LL')
		) {
			setActiveTab(PERIOD.DAY);
		}
		if (
			selectedStart === dayjs().startOf('week').format('LL') &&
			selectedEnd === dayjs().endOf('week').format('LL')
		) {
			setActiveTab(PERIOD.WEEK);
		}
		if (
			selectedStart === dayjs().startOf('month').format('LL') &&
			selectedEnd === dayjs().endOf('month').format('LL')
		) {
			setActiveTab(PERIOD.MONTH);
		}
		return () => {};
	}, [selectedDate]);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Jobs' currentPage='Manage Jobs' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Jobs'>
				<div className='flex justify-between gap-4 border-b border-zinc-300/25 bg-white/75 px-6 py-4 dark:border-zinc-800/50 dark:bg-zinc-900/75 dark:text-white'>
					<SubheaderLeft>
						<CustomSearchComponent
							placeholder='Search Jobs...'
							searchLimit={9}
							setSearchActionForPagination={setJobSearch}
							searchListAction={getJobsList}
							searchByFilterOptions={[
								'title',
								'location',
								'type',
								'experience',
								'clientName',
								'clientEmail',
							]}
						/>
					</SubheaderLeft>
					<SubheaderRight>
						<PeriodAndDateRange
							setDateRange={setDateRange}
						/>
					</SubheaderRight>
				</div>
				<Subheader>
					<SubheaderLeft className='!block'>
						<CardTitle>Jobs</CardTitle>
						<CardSubTitle>
							Create, Delete, and assign Candidates to jobs effectively.
						</CardSubTitle>
					</SubheaderLeft>
					<SubheaderRight>
						<Link to='/jobs/create-job'>
							<Button variant='solid' rightIcon='HeroPlus'>
								Create a new job
							</Button>
						</Link>
					</SubheaderRight>
				</Subheader>
				<PageLoader loading={pageLoading} error={error} data={paginatedList}>
					<Container className='grid grid-cols-12 gap-4'>
						{paginatedList.map((item: any) => (
							<JobsPageCardPartial item={item} key={item.id} />
						))}
					</Container>
				</PageLoader>
				<Pagination
					search={search}
					getListAction={getJobsList}
					count={paginationCount}
					limit={9}
				/>
			</PageWrapper>
		</>
	);
};

export default JobsPage;
