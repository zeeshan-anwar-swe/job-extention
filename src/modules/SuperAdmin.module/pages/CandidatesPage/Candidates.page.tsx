import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Range } from 'react-date-range';
import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';

import Subheader, {
	SubheaderLeft,
} from '../../../../components/layouts/Subheader/Subheader';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import SortDropdownPartial from './_partial/SortDropdown.partial';
import StatusDropdownPartial from './_partial/StatusDropdown.partial';

const SuperAdminCandidatesPage = () => {
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
					<Breadcrumb path='Pages / Candidates' currentPage='Manage Candidates' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<SearchPartial />
						<Button
							iconSize='text-5xl'
							rightIcon='HeroMicrophone'
							borderWidth='border'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='CustomKoalaHead'>
							Search with KoalaByte Talking Avatar
						</Button>

						<Button
							borderWidth='border'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroBarFilter'>
							Filter
						</Button>
					</SubheaderLeft>
				</Subheader>
				<Container>
					<Card className='h-full'>
						<CardHeader>
							<CardHeaderChild className='flex flex-col !items-start !gap-0'>
								<CardTitle>Shortlisted Candidates</CardTitle>
								<p>Manage Candidates assigned to your jobs by Recruiter. </p>
							</CardHeaderChild>
							<CardHeaderChild>
								<SortDropdownPartial />
								<StatusDropdownPartial />
							</CardHeaderChild>
						</CardHeader>
						<CardBody>
							<TablePartial />
						</CardBody>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SuperAdminCandidatesPage;
