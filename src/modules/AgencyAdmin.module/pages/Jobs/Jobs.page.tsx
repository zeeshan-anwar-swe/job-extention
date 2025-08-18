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
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getJobsList, getTeamlistForJobs, setJobSearch } from '../../../../store/slices/Jobs.slice';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../components/ui/Pagination';
import CustomSearchComponent from '../../components/CustomSearch.component';
import { Link } from 'react-router-dom';
import PeriodAndDateRange from '../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial';
import { CustomFilterDropdownComponent } from '../../components/CustomFilterDropdown.component';
import { JobType } from '../../../../types/enums/jobType.enum';

const JobsPage = () => {
	const dispatch: AppDispatch = useDispatch();

	
	const { pageLoading, error, paginatedList, paginationCount, search, searchBy } = useSelector(
		(state: RootState) => state.jobsSlice,
	);
	const [dateRange, setDateRange] = useState<any>({
		startDate: dayjs().format('YYYY-MM-DD'),
		endDate: '',
	});

	useEffect(() => {
		console.log('dateRange', dateRange);
		if (dateRange.endDate !== '') {
			dispatch(
				getJobsList({
					page: 1,
					limit: 9,
					search,
					startDate: dateRange.startDate,
					endDate: dateRange.endDate,
				}),
			);
		}
		if (dateRange.startDate === '') {
			dispatch(getJobsList({ page: 1, limit: 9, search }));
		}
	}, [dateRange]);

	useEffect(() => {
		dispatch(getTeamlistForJobs());
	}, []);

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
							// searchByFilterOptions={[
							// 	'title',
							// 	'location',
							// 	'type',
							// 	'experience',
							// 	'clientName',
							// 	'clientEmail',
							// ]}
						/>
						<CustomFilterDropdownComponent
							filterBy='type'
							search={search}
							setSearch={setJobSearch} 
							getListAction={getJobsList}
							options={[
								{ label: 'On Site', value: JobType.ON_SITE },
								{ label: 'Remote', value: JobType.REMOTE },
								{ label: 'Hybird', value: JobType.HYBRID },
							]}
						/>
					</SubheaderLeft>
					<SubheaderRight>
						<PeriodAndDateRange setDateRange={setDateRange} />
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
					searchBy={searchBy}
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
