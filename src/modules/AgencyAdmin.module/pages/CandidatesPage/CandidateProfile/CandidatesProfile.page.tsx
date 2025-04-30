import Container from '../../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../../components/ui/Button';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/ui/Card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
	urlValidationCheck,
} from '../../../../../utils/validationCheck';
import Alert from '../../../../../components/ui/Alert';
import HeaderPartial from './_partial/Header.partial';
import Label from '../../../../../components/form/Label';
import Badge from '../../../../../components/ui/Badge';
import LabelTextareaPartial from './_partial/LabelTextarea.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import { useEffect } from 'react';
import { getCandidateProfile } from '../../../../../store/slices/Candiates.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';

const CandidatesProfilePage = () => {
	const { state } = useLocation();
	const navigateTo = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const { pageLoading, cadnidateProfile, error } = useSelector(
		(state: RootState) => state.candidates,
	);

	cadnidateProfile && console.log('cadnidateProfile', cadnidateProfile);

	useEffect(() => {
		if (state) {
			dispatch(getCandidateProfile({ id: state.id, candidateId: state.id }));
		} else {
			navigateTo('/candidates');
		}
	}, [state]);
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

				<PageLoader loading={pageLoading} error={error} data={cadnidateProfile}>
					<Container>
						<HeaderPartial state={state} />
						<div className='mt-4 grid grid-cols-12 gap-4'>
							<Card className='col-span-8 flex flex-col gap-2 max-lg:col-span-12'>
								<CardHeader className='!block'>
									<CardTitle>Primary Details</CardTitle>
									<CardSubTitle className='font-light'>
										Get an overview of the candidate's key details.
									</CardSubTitle>
								</CardHeader>
								<CardBody>
									<div className='flex items-center gap-4 '>
										<LabelTextareaPartial
											label='About'
											detail={textValidationCheck(
												cadnidateProfile?.profile?.about,
											)}
										/>
									</div>

									<div className='flex items-center gap-4 max-md:flex-col'>
										<LabelTitlepartial
											label='Roles'
											detail={
												cadnidateProfile?.profile?.roles
													? cadnidateProfile?.profile?.roles?.join(', ')
													: ''
											}
										/>
										<LabelTitlepartial label='Location' detail={''} />
									</div>
									<div className='flex items-center gap-4 max-md:flex-col'>
										<LabelTitlepartial
											label='Experience'
											detail={cadnidateProfile?.profile?.experience}
										/>
										<LabelTitlepartial
											label='Education'
											detail={cadnidateProfile?.profile?.education}
										/>
									</div>
									<div className='flex flex-col items-center'>
										<LabelTitlepartial label='Availability' detail='' />
									</div>
									<LabelTitlepartial
										label='Top Skills'
										detail={cadnidateProfile?.profile?.skills?.join(', ')}
									/>
								</CardBody>
							</Card>

							<div className='col-span-4 flex flex-col gap-4  max-lg:col-span-12'>
								<Card className='h-fit w-full pb-4'>
									<CardHeader>
										<CardHeaderChild className='!gap-2'>
											<CardTitle>Jobs Assigned</CardTitle>
											<Label htmlFor='Assigment'>
												View the jobs, candidate is assigned to.
											</Label>
										</CardHeaderChild>
									</CardHeader>

									<CardBody className='mx-4 flex flex-col gap-4 rounded-xl bg-zinc-100 py-4 dark:bg-zinc-800'>
										<CardTitle>Product Designer</CardTitle>
										<Label htmlFor='description'>
											Product Designer with 3 years of experience. Full time
											On site Job.
										</Label>
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
										<Badge
											className='w-fit text-blue-600'
											colorIntensity='100'
											variant='solid'>
											In Review
										</Badge>
										<p>Excellent problem-solving abilities, very impressed!</p>
									</CardBody>
								</Card>
								<Card className='h-fit p-4'>
									<div>
										<h1>CV</h1>
										<p className='font-light'>Download or view Candidate CV</p>
									</div>

									<Link
										target='_blank'
										to={urlValidationCheck(
											cadnidateProfile?.profile?.resumeLink,
										)}
										className='flex items-center justify-between rounded-xl border-2 border-zinc-100'>
										<Button className='h-fit' icon='HeroPdf' color='zinc'>
											FluerCook.pdf
										</Button>
										<Alert icon='HeroArrowDown'>{''}</Alert>
									</Link>
								</Card>

								<Card className='h-fit p-4'>
									<div>
										<h1>Social Profiles</h1>
										<p className='font-light'>Social profile insights</p>
									</div>
									<div className='flex flex-col gap-2'>
										<Link
											target='_blank'
											to={'#'}
											className='flex items-center justify-between rounded-xl border-2 border-zinc-100 '>
											<Button
												className='h-fit'
												icon='HeroLinkedIn'
												color='zinc'>
												Linked In
											</Button>
											<Alert icon='HeroArrowUpRight'>{''}</Alert>
										</Link>
										<Link
											target='_blank'
											to={'/'}
											className='flex items-center justify-between rounded-xl border-2 border-zinc-100'>
											<Button
												className='h-fit'
												icon='HeroGitHub'
												color='zinc'>
												Git Hub
											</Button>
											<Alert icon='HeroArrowUpRight'>{''}</Alert>
										</Link>
									</div>
								</Card>
							</div>
						</div>
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default CandidatesProfilePage;
