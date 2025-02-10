import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Range } from 'react-date-range';
import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import PERIOD, { TPeriod } from '../../../constants/periods.constant';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../components/ui/Button';
import Breadcrumb from '../../../components/layouts/Breadcrumb/Breadcrumb';
import Card from '../../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import { Link } from 'react-router-dom';
import TableDataProfilePartial from './_partial/TableDataProfile.partial';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';
import Alert from '../../../components/ui/Alert';

const CandidatesProfilePage = () => {
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
					<Breadcrumb path='Pages / Candidates' currentPage='Candidates Profile' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/candidates'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Candidates
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<Container>
					<Card className='flex'>
						<div className='flex items-center justify-between px-4 py-2'>
							<TableDataProfilePartial
								title='Dalia Benz'
								subTitle='dali@hotmail.com'
							/>
							<div className='flex justify-end gap-x-4'>
								<Button className='h-fit' variant='solid'>
									Assign to a job
								</Button>
								<Button
									rightIcon='HeroPaperAirplane'
									className='h-fit'
									variant='solid'>
									Send To ATS
								</Button>
								<Button
									rightIcon='HeroPencilSquare'
									className='h-fit'
									variant='outline'
									color='zinc'>
									Edit CV
								</Button>
								<Button
									rightIcon='HeroArrowDown'
									className='h-fit'
									variant='outline'
									color='zinc'>
									Download
								</Button>
							</div>
						</div>
					</Card>
					<div className='mt-4 grid grid-cols-12 gap-4'>
						<Card className='col-span-8 flex flex-col gap-2  p-4 max-lg:col-span-12'>
							<div>
								<h1>Primary Details</h1>
								<p className='font-light'>
									Get an overview of the candidate's key details.
								</p>
							</div>

							<div className='flex items-center gap-4 '>
								<LabelTitlepartial
									label='About'
									detail='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris nisi ut
									aliquip ex ea commodo consequat.'
								/>
							</div>

							<div className='flex items-center gap-4 '>
								<LabelTitlepartial
									label='Roles'
									detail='Product Designer, UI/UX Designer'
								/>
								<LabelTitlepartial label='Location' detail='Miami, USA' />
							</div>
							<div className='flex items-center gap-4 '>
								<LabelTitlepartial label='Experience' detail='3 Years' />
								<LabelTitlepartial
									label='Education'
									detail='BS in Product Design'
								/>
							</div>
							<div className='flex items-center gap-4 '>
								<LabelTitlepartial
									label='Availability'
									detail='Open to New Opportunities'
								/>
								<LabelTitlepartial
									label='Education'
									detail='BS in Product Design'
								/>
							</div>
							<div className='flex items-center gap-4 '>
								<LabelTitlepartial
									label='Top Skills'
									detail='Figma, Photoshop, Illustrator, Product Design, User Testing'
								/>
							</div>
						</Card>

						<div className='col-span-4 flex flex-col gap-4 max-lg:col-span-12'>
							<Card className='h-fit w-full p-4'>
								<div>
									<h1>Jobs Assigned</h1>
									<p className='font-light'>
										View the jobs, candidate is assigned to.
									</p>
								</div>
								<div className='flex flex-col gap-2 rounded-xl bg-zinc-100 p-4'>
									<div>
										<h3>Product Designer</h3>
										<p className='font-light'>
											Product Designer with 3 years of experience. Full time
											On site Job.
										</p>
									</div>

									<NavSeparator />

									<div className='flex items-center gap-4'>
										<img
											className='aspect-square w-10'
											src={profileImageUrlValidationCheck(null)}
											alt='profile'
										/>
										<h5>Phoenix Baker</h5>
										<p className='m-0 p-0 font-light'>1:22PM Yesterday </p>
									</div>
								</div>
							</Card>
							<Card className='h-fit p-4'>
								<div>
									<h1>CV</h1>
									<p className='font-light'>Download or view Candidate CV</p>
								</div>

								<div className='flex items-center justify-between rounded-xl border-2 border-zinc-100 px-4'>
									<Button className='h-fit' icon='HeroDocument' color='zinc'>
										FluerCook.pdf
									</Button>
									<Alert icon='HeroArrowDown'>{''}</Alert>
								</div>
							</Card>

							<Card className='h-fit p-4'>
								<div>
									<h1>Social Profiles</h1>
									<p className='font-light'>Social profile insights</p>
								</div>
								<div className='flex-cols flex gap-4'>
									<div className='flex items-center justify-between rounded-xl border-2 border-zinc-100 px-4'>
										<Button className='h-fit' icon='HeroDocument' color='zinc'>
											Linked In
										</Button>
										<Alert icon='HeroArrowUpRight'>{''}</Alert>
									</div>
									<div className='flex items-center justify-between rounded-xl border-2 border-zinc-100 px-4'>
										<Button className='h-fit' icon='HeroDocument' color='zinc'>
											Git Hub
										</Button>
										<Alert icon='HeroArrowUpRight'>{''}</Alert>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default CandidatesProfilePage;
