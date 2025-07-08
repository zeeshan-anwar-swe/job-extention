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
	CardSubTitle,
	CardTitle,
} from '../../../../../components/ui/Card';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';

import HeaderPartial from './_partial/Header.partial';
import LabelTitleTextAreapartial from './_partial/LabelTitleTextArea.partial';
import SortDropdownPartial from './_partial/SortDropdown.partial';
import Badge from '../../../../../components/ui/Badge';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamMemberDetails } from '../../../../../store/slices/Team.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import { textValidationCheck } from '../../../../../utils/validationCheck';

const TeammateProfilePage = () => {
	const { state } = useLocation();

	const navigateTo = useNavigate();

	const dispatch: AppDispatch = useDispatch();

	const { teamMemberProfile, pageLoading, error } = useSelector((state: RootState) => state.team);

	teamMemberProfile && console.log({ teamMemberProfile });

	useEffect(() => {
		if (!state) {
			navigateTo('/manage-team');
		} else {
			dispatch(getTeamMemberDetails(state.id));
		}
	}, []);

	return (
		<PageLoader error={error} loading={pageLoading} data={teamMemberProfile}>
			<>
				<Header>
					<HeaderLeft>
						<Breadcrumb path='Pages / Manage Team' currentPage='Teammate Profile' />
					</HeaderLeft>
					<HeaderRight>
						<DefaultHeaderRightCommon />
					</HeaderRight>
				</Header>
				<PageWrapper name='Candidates'>
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
						<Card className='col-span-8 flex flex-col gap-2 max-lg:col-span-12'>
							<CardHeader>
								<CardHeaderChild className='!block'>
									<CardTitle>Performance Metrics</CardTitle>
									<CardSubTitle className='font-light'>
										Get an overview of the Teammate Performance.
									</CardSubTitle>

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
										Total Jobs:&nbsp;{' '}
										<b>
											{textValidationCheck(
												teamMemberProfile?.statistics?.totalJobs,
											)}
										</b>
									</Badge>
									<Badge
										variant='solid'
										color='emerald'
										colorIntensity='300'
										className='!flex-grow p-2 !text-emerald-950'>
										Successful Jobs:&nbsp;{' '}
										<b>
											{textValidationCheck(
												teamMemberProfile?.statistics?.jobsCompleted,
											)}
										</b>
									</Badge>
									<Badge
										variant='solid'
										color='red'
										colorIntensity='300'
										className='!flex-grow p-2 !text-red-950'>
										Rejected Jobs:&nbsp; <b>{textValidationCheck('')}</b>
									</Badge>
									<Badge
										variant='solid'
										color='blue'
										colorIntensity='300'
										className='!flex-grow p-2 !text-blue-950'>
										Active Jobs:&nbsp; <b>{textValidationCheck('')}</b>
									</Badge>
									<Badge
										variant='solid'
										color='amber'
										colorIntensity='300'
										className='!flex-grow p-2 !text-amber-950'>
										Backlog:&nbsp;{' '}
										<b>
											{textValidationCheck(
												teamMemberProfile?.statistics?.backlogJobs,
											)}
										</b>
									</Badge>
								</CardHeaderChild>
							</CardHeader>

							<CardBody className='flex flex-col gap-4'>
								<div className='flex items-center gap-4 '>
									<LabelTitleTextAreapartial
										label='About'
										detail={teamMemberProfile?.team?.about}
									/>
								</div>

								<div className='flex items-center gap-4 '>
									<LabelTitlepartial
										label='Location'
										detail={teamMemberProfile?.team?.location}
									/>
									<LabelTitlepartial
										label='Company'
										detail={teamMemberProfile?.team?.company}
									/>
								</div>
								<div className='flex items-center gap-4 '>
									<LabelTitlepartial
										detail={teamMemberProfile?.team?.createdAt}
										inputType='date'
										label='DOB'
									/>
									<LabelTitlepartial
										label='Industry Sector'
										detail={teamMemberProfile?.team?.industry}
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

						<Card className='col-span-4 flex flex-col gap-2 max-lg:col-span-12'>
							<CardHeader className='!block'>
								<CardTitle>Active Jobs</CardTitle>
								<CardSubTitle>View the jobs assigned to candidate.</CardSubTitle>
							</CardHeader>
							<CardBody className='flex max-h-[500px] !flex-col gap-4 overflow-y-scroll'>
								
							</CardBody>
						</Card>
					</Container>
				</PageWrapper>
			</>
		</PageLoader>
	);
};

export default TeammateProfilePage;
