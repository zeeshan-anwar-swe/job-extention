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
import PeriodAndDateRange from '../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial';

const TaskboardPage = () => {

	const [dateRange, setDateRange] = useState<any>({ startDate: '', endDate: '' });

	const { backlogJobs, inProgressJobs, inReviewJobs, completedJobs } = useSelector(
		(state: RootState) => state.taskBoard,
	);




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
						<PeriodAndDateRange
							setDateRange={setDateRange}
						/>
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
							jobList={inReviewJobs}
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
