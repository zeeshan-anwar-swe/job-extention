import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../../store';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import Container from '../../../../../components/layouts/Container/Container';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import { getCustomCVById } from '../../../../../store/slices/Agency/CustomCV.slice';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../../components/ui/Card';
import Badge from '../../../../../components/ui/Badge';
import Button from '../../../../../components/ui/Button';
import Icon from '../../../../../components/icon/Icon';
import { CVProfilePhoto } from './_partial/CVProfilePhoto';

const ViewCustomCVPage = () => {
	const { loading, data, error } = useSelector((state: RootState) => state.customCV.cvDetails);
	const dispatch: AppDispatch = useDispatch();
	const navigateTo = useNavigate();
	const { state } = useLocation();

	useLayoutEffect(() => {
		if (!state) {
			navigateTo('/dashboard/custom-cv');
		} else {
			dispatch(getCustomCVById(state.id));
		}
	}, []);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Custom CV' currentPage='View CV' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>

			<PageWrapper name='View Custom CV'>
				{/* <Subheader>
					<SubheaderLeft>
						<Button icon='HeroArrowLeft'>Back</Button>
					</SubheaderLeft>
				</Subheader> */}
				<PageLoader
					data={data}
					error={error}
					loading={loading}
					messageForEmptyData='No Custom CV data found'>
					<Container className='mx-auto space-y-4'>
						<div className='flex w-full justify-end gap-4'>
							<Button
								variant='solid'
								onClick={() => navigateTo('/dashboard/custom-cv/edit', { state: data })}
								icon='HeroPencilSquare'>
								Edit CV
							</Button>
							<Button
								variant='solid'
								color='zinc'
								onClick={() => navigateTo('/dashboard/custom-cv')}
								icon='HeroArrowLeft'>
								Back
							</Button>
						</div>
						<Card className='shadow'>
							<CardBody className='pt-6'>
								<div className='flex flex-col gap-6 md:flex-row'>
									<CVProfilePhoto image={data?.profilePictureUrl} />
									<div className='flex-1 text-center md:text-left'>
										<h1 className='text-balance text-3xl font-bold'>
											{data?.firstName}
										</h1>
										<p className='text-muted-foreground mt-2 text-pretty text-xl'>
											{data?.headline}
										</p>

										<div className='text-muted-foreground mt-4 flex flex-wrap justify-center gap-4 text-sm md:justify-start'>
											<Button className='!pl-0' icon='HeroMapPin'>
												{data?.location}
											</Button>

											<Button icon='HeroUsers'>
												{data?.connectionsCount}+ connections
											</Button>
											<div className='flex items-center gap-1'>
												{/* <ExternalLink className='h-4 w-4' /> */}
												<Link
													to={data?.publicProfileUrl ?? ''}
													target='_blank'>
													<Button icon='HeroArrowTopRightOnSquare'>
														LinkedIn Profile
													</Button>
												</Link>
											</div>
										</div>

										<div className='mt-4'>
											<Badge
												color='zinc'
												colorIntensity='100'
												variant='solid'>
												{data?.industry}
											</Badge>
											<Badge
												variant='outline'
												color='zinc'
												className='ml-2 !bg-transparent'>
												{data?.networkDistance} connection
											</Badge>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>

						{/* Summary Section */}
						<Card className='shadow'>
							<CardHeader>
								<CardTitle>About</CardTitle>
							</CardHeader>
							<CardBody>
								<p className='text-pretty leading-relaxed'>{data?.summary}</p>
							</CardBody>
						</Card>

						{/* Work Experience Section */}
						<Card className='shadow'>
							<CardHeader>
								<CardTitle>Work Experience</CardTitle>
							</CardHeader>
							<CardBody className='space-y-6'>
								{data?.workExperience.map((work, index) => (
									<div
										key={index}
										className='border-muted border-l-2 pb-4 pl-4 last:pb-0'>
										<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
											<div>
												<h3 className='text-lg font-semibold'>
													{work.role}
												</h3>
												<div className='text-muted-foreground flex items-center gap-2'>
													<a
														href={work.companyUrl}
														className='font-medium hover:underline'
														target='_blank'
														rel='noopener noreferrer'>
														{work.company}
													</a>
													<span>•</span>
													<span>{work.location}</span>
												</div>
											</div>
											<div className='text-muted-foreground flex items-center gap-1 text-sm'>
												<Button icon='HeroCalendar'>
													{work.start.year} -{' '}
													{work?.end?.year ?? 'Present'}
												</Button>
											</div>
										</div>
										<p className='mt-3 text-pretty leading-relaxed'>
											{work.description}
										</p>
									</div>
								))}
							</CardBody>
						</Card>

						{/* Education Section */}
						<Card className='shadow'>
							<CardHeader>
								<CardTitle>Education</CardTitle>
							</CardHeader>
							<CardBody className='space-y-4'>
								{data?.education.map((edu) => (
									<div key={edu.id} className='border-muted border-l-2 pl-4'>
										<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
											<div>
												<h3 className='font-semibold'>{edu.degree}</h3>
												<p className='text-muted-foreground'>
													{edu.school}
												</p>
												<p className='text-muted-foreground text-sm'>
													{edu.fieldOfStudy}
												</p>
											</div>
											<div className='text-muted-foreground flex items-center gap-1 text-sm'>
												<Button icon='HeroCalendar'>
													{edu.start.year} - {edu?.end?.year ?? 'Present'}
												</Button>
											</div>
										</div>
									</div>
								))}
							</CardBody>
						</Card>

						{/* Skills Section */}
						<Card className='shadow'>
							<CardHeader>
								<CardTitle>Skills & Endorsements</CardTitle>
							</CardHeader>
							<CardBody>
								<div className='flex flex-wrap gap-2'>
									{data?.skills.map((skill, index) => (
										<Badge
											color='zinc'
											colorIntensity='100'
											key={index}
											variant='solid'
											className='flex items-center gap-1'>
											{skill.name}
										</Badge>
									))}
								</div>
							</CardBody>
						</Card>
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default ViewCustomCVPage;
