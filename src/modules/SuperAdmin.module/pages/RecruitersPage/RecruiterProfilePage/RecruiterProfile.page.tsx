import Container from '../../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../../components/ui/Button';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../../../components/ui/Card';
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import HeaderPartial from './_partial/Header.partial';
import LabelTitleTextAreapartial from './_partial/LabelTitleTextArea.partial';
import SortDropdownPartial from './_partial/SortDropdown.partial';
import Badge from '../../../../../components/ui/Badge';

const SuperAdminRecruiterProfilePage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Recruiter' currentPage='Recruiter Profile' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Recruiter Profile'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/manage-team'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Manage Team
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<Container className='!grid !grid-cols-12  !gap-4'>
					<HeaderPartial />
					<Card className='col-span-12 flex flex-col gap-2 max-lg:col-span-12'>
						<CardHeader>
							<CardHeaderChild className='!flex w-full !items-center !justify-between'>
								<div className='flex flex-col gap-2'>
									<h1>Performance Metrics</h1>
									<p className='font-light'>
										Get an overview of the Teammate Performance.
									</p>
								</div>
								<Button
									rounded='rounded-full'
									borderWidth='border'
									className='!px-2 !py-1'
									icon='HeroArrowsUpDown'
									variant='outline'
									color='zinc'>
									<SortDropdownPartial />
								</Button>
							</CardHeaderChild>
							<CardHeaderChild className='flex w-full flex-wrap items-center gap-2'>
								<Badge
									variant='solid'
									color='zinc'
									colorIntensity='300'
									className='!flex-grow p-2 !text-zinc-950'>
									Total Jobs:&nbsp; <b>53</b>
								</Badge>
								<Badge
									variant='solid'
									color='emerald'
									colorIntensity='300'
									className='!flex-grow p-2 !text-emerald-950'>
									Successful Jobs::&nbsp; <b>43</b>
								</Badge>
								<Badge
									variant='solid'
									color='red'
									colorIntensity='300'
									className='!flex-grow p-2 !text-red-950'>
									Rejected Jobs:&nbsp; <b>53</b>
								</Badge>
								<Badge
									variant='solid'
									color='blue'
									colorIntensity='300'
									className='!flex-grow p-2 !text-blue-950'>
									Active Jobs:&nbsp; <b>1</b>
								</Badge>
								<Badge
									variant='solid'
									color='amber'
									colorIntensity='300'
									className='!flex-grow p-2 !text-amber-950'>
									Backlog:&nbsp; <b>5</b>
								</Badge>
							</CardHeaderChild>
						</CardHeader>

						<CardBody className='flex flex-col gap-4'>
							<div className='flex items-center gap-4 '>
								<LabelTitleTextAreapartial
									rows={6}
									label='About'
									detail='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
								/>
							</div>

							<div className='flex items-center gap-4 '>
								<LabelTitlepartial label='Location' detail='Miami, USA' />
								<LabelTitlepartial label='Experience' detail='4 years' />
							</div>
							<div className='flex items-center gap-4 '>
								<LabelTitlepartial inputType='date' label='DOB' />
								<LabelTitlepartial
									label='Industry Sector'
									detail='Tech / Finance'
								/>
							</div>
						</CardBody>
						<CardFooter>
							<label className='font-light'>Social Media</label>
							<CardFooterChild className='w-full	'>
								<Button
									size='xl'
									className='!flex-grow gap-2'
									icon='HeroLinkedIn'
									rightIcon='HeroArrowUpRight'
									variant='outline'
									color='zinc'>
									LinkedIn
								</Button>
								<Button
									size='xl'
									className='!flex-grow gap-2'
									icon='HeroGitHub'
									rightIcon='HeroArrowUpRight'
									variant='outline'
									color='zinc'>
									GitHub
								</Button>
								<Button
									size='xl'
									className='!flex-grow gap-2'
									icon='HeroTwitterX'
									rightIcon='HeroArrowUpRight'
									variant='outline'
									color='zinc'>
									Twitter
								</Button>
							</CardFooterChild>
						</CardFooter>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SuperAdminRecruiterProfilePage;
