import Container from '../../components/layouts/Container/Container';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import Card, { CardBody, CardHeader, CardHeaderChild } from '../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import JobsPageCardPartial from './_partial/JobsPageCard.partial';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../components/ui/Dropdown';
import { DateRangePicker, Range } from 'react-date-range';
import PERIOD, { TPeriod } from '../../constants/periods.constant';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import colors from 'tailwindcss/colors';
import themeConfig from '../../config/theme.config';
import HeaderPartial from './_partial/Header.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getJobsList, getTeamlistForJobs } from '../../store/slices/Jobs.slice';
import ShimmerEffectPageLoader from '../../components/layouts/PageLoader/ShimmerEffectPageLoader';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';

const JobsPage = () => {
	const { i18n } = useTranslation();

	const dispatch: AppDispatch = useDispatch();

	const { pageLoading, error, jobsList } = useSelector((state: RootState) => state.jobsSlice);

	const [activeTab, setActiveTab] = useState<TPeriod>(PERIOD.DAY);

	const [selectedDate, setSelectedDate] = useState<Range[]>([
		{
			startDate: dayjs().startOf('week').add(-1, 'week').toDate(),
			endDate: dayjs().endOf('week').toDate(),
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

	useEffect(() => {
		// @ts-ignore
		dispatch(getJobsList());
	}, []);

	return pageLoading ? (
		<ShimmerEffectPageLoader />
	) : (
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
				<Subheader>
					<SubheaderLeft>
						<SearchPartial />
						<Button
							borderWidth='border-2'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroBarFilter'>
							Filter
						</Button>
					</SubheaderLeft>
					<SubheaderRight>
						<Dropdown>
							<DropdownToggle>
								<Button icon='HeroCalendarDays'>
									{activeTab === PERIOD.DAY &&
										dayjs().locale(i18n.language).format('LL')}
									{activeTab === PERIOD.WEEK &&
										`${dayjs()
											.startOf('week')
											.locale(i18n.language)
											.format('MMMM D')} - ${dayjs()
											.endOf('week')
											.locale(i18n.language)
											.format('MMMM D, YYYY')}`}
									{activeTab === PERIOD.MONTH &&
										dayjs()
											.startOf('month')
											.locale(i18n.language)
											.format('MMMM, YYYY')}
								</Button>
							</DropdownToggle>
							<DropdownMenu className='!p-0'>
								<DateRangePicker
									onChange={(item) => setSelectedDate([item.selection])}
									moveRangeOnFirstSelection={false}
									months={2}
									ranges={selectedDate}
									direction='horizontal'
									rangeColors={[
										colors[themeConfig.themeColor][themeConfig.themeColorShade],
										colors.emerald[themeConfig.themeColorShade],
										colors.amber[themeConfig.themeColorShade],
									]}
								/>
							</DropdownMenu>
						</Dropdown>
					</SubheaderRight>
				</Subheader>
				<Container className='h-full'>
					<Card className='grid !flex-grow grid-cols-12 gap-4 '>
						<CardHeader className='col-span-12 '>
							<CardHeaderChild>
								<div>
									<h1>Jobs</h1>
									<p>
										Create, Delete, and assign Candidates to jobs effectively.
									</p>
								</div>
							</CardHeaderChild>
							<CardHeaderChild>
								<HeaderPartial />
							</CardHeaderChild>
						</CardHeader>
						<CardBody className='col-span-12 grid  grid-cols-12 gap-4'>
							{jobsList.map((item: any) => (
								<JobsPageCardPartial item={item} key={item.id} />
							))}
						</CardBody>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default JobsPage;
