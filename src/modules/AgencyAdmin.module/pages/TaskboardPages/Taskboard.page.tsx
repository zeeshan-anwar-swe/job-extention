import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import { DateRangePicker, Range } from 'react-date-range';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import colors from 'tailwindcss/colors';
import themeConfig from '../../../../config/theme.config';
import TaskSectionCardPartial from './_partial/TaskSectionCard.partial';
import CustomDropDown from '../../components/CustomDropDown.component';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { JobStatus } from '../../../../types/enums/jobStatus.enum';
import {
	getTaskBoardBackLogJobs,
	getTaskBoardCompletedJobs,
	getTaskBoardInProgressJobs,
	getTaskBoardInReviewJobs,
} from '../../../../store/slices/Agency/Taskboard.slice';

const TaskboardPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const { backlogJobs, inProgressJobs, inReviewJobs, completedJobs } = useSelector(
		(state: RootState) => state.taskBoard,
	);
	const { i18n } = useTranslation();

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

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Task Board' currentPage='Manage Task' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Jobs'>
				<Subheader>
					<SubheaderLeft>
						<CustomDropDown
							items={[
								'All Projects',
								'Backlog',
								'In Progress',
								'In Review',
								'Completed',
							]}
							title='All Projects'
							icon='HeroListBullet'
						/>

						<CustomDropDown
							items={['Assending', 'Descending']}
							title='Sort By'
							icon='HeroArrowsUpDown'
						/>

						<CustomDropDown
							items={['Custom1', 'Custom2', 'custom3']}
							title='Customise'
							icon='HeroPencilSquare'
						/>

						<CustomDropDown
							items={['option1', 'option2', 'option3']}
							title='Filter'
							icon='HeroBarFilter'
						/>
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
				<Container className='grid grid-cols-4 gap-4 '>
					<Card className='col-span-4 grid grid-cols-4 gap-4  p-4 '>
						<Card className='col-span-4 '>
							<CardHeader className='w-full'>
								<CardHeaderChild className='!block'>
									<CardTitle>Jobs</CardTitle>
									<CardSubTitle>
										Create, Delete, and assign Candidates to jobs effectively.
									</CardSubTitle>
								</CardHeaderChild>
							</CardHeader>
						</Card>
						<TaskSectionCardPartial
							ListLimit={10}
							getJobListAction={getTaskBoardBackLogJobs}
							jobList={backlogJobs}
							color='amber'
							lineColor='!border-amber-500'
							cardType={JobStatus.BACKLOG}
						/>
						<TaskSectionCardPartial
							ListLimit={10}
							getJobListAction={getTaskBoardInProgressJobs}
							jobList={inProgressJobs}
							color='blue'
							lineColor='!border-blue-500'
							cardType={JobStatus.IN_PROGRESS}
						/>
						<TaskSectionCardPartial
							ListLimit={10}
							getJobListAction={getTaskBoardInReviewJobs}
							jobList={inProgressJobs}
							color='violet'
							lineColor='!border-violet-500'
							cardType={JobStatus.IN_REVIEW}
						/>
						<TaskSectionCardPartial
							ListLimit={10}
							getJobListAction={getTaskBoardCompletedJobs}
							jobList={completedJobs}
							color='emerald'
							lineColor='!border-emerald-500'
							cardType={JobStatus.COMPLETED}
						/>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default TaskboardPage;
