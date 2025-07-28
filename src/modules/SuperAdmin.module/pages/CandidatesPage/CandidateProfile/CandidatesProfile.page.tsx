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
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';

import HeaderPartial from './_partial/Header.partial';
import LabelTextareapartial from './_partial/LabelTextarea.partial';
import Alert from '../../../../../components/ui/Alert';
import Badge from '../../../../../components/ui/Badge';
import Label from '../../../../../components/form/Label';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import { profileImageUrlValidationCheck } from '../../../../../utils/validationCheck';

const CandidatesProfilePage = () => {
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
				<Container className='grid grid-cols-12 gap-4'>
					<HeaderPartial />
					<Card className='col-span-8 flex flex-col gap-2 max-lg:col-span-12'>
						<CardHeader>
							<CardHeaderChild className='!block'>
								<CardTitle>Primary Details</CardTitle>
								<CardSubTitle>Primary Details</CardSubTitle>
							</CardHeaderChild>
						</CardHeader>

						<CardBody className='flex flex-col gap-4'>
							<LabelTextareapartial
								rows={4}
								label='About'
								detail='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
							/>

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
							<LabelTitlepartial
								label='Top Skills'
								detail='Figma, Photoshop, Illustrator, Product Design, User Testing'
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
								<div>
									<CardTitle>Product Designer</CardTitle>
									<CardSubTitle>
										Product Designer with 3 years of experience. Full time On
										site Job.
									</CardSubTitle>
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
								<div>
									<Badge
										className='w-fit text-blue-600'
										colorIntensity='100'
										variant='solid'>
										In Review
									</Badge>
									<p className='my-2'>
										Excellent problem-solving abilities, very impressed!
									</p>
								</div>
							</CardBody>
						</Card>
						<Card className='h-fit '>
							<CardHeader>
								<CardHeaderChild className='!block'>
									<CardTitle>CV</CardTitle>
									<CardSubTitle>Download or view Candidate CV</CardSubTitle>
								</CardHeaderChild>
							</CardHeader>

							<CardBody>
								<Link
									target='_blank'
									to={'#'}
									className='flex items-center justify-between rounded-xl border-2 border-zinc-100'>
									<Button className='h-fit' icon='HeroPdf' color='zinc'>
										FluerCook.pdf
									</Button>
									<Alert icon='HeroArrowDown' />
								</Link>
							</CardBody>
						</Card>

						<Card className='h-fit'>
							<CardHeader>
								<CardHeaderChild className='!block'>
									<CardTitle>Social Profiles</CardTitle>
									<CardSubTitle>Social profile insights</CardSubTitle>
								</CardHeaderChild>
							</CardHeader>

							<CardBody>
								<div className='flex flex-col'>
									<Link
										target='_blank'
										to={'#'}
										className='flex items-center justify-between rounded-xl border-2 border-zinc-100 '>
										<Button className='h-fit' icon='HeroLinkedIn' color='zinc'>
											Linked In
										</Button>
										<Alert icon='HeroArrowUpRight' />
									</Link>
									<Link
										target='_blank'
										to={'/'}
										className='flex items-center justify-between rounded-xl border-2 border-zinc-100'>
										<Button className='h-fit' icon='HeroGitHub' color='zinc'>
											Git Hub
										</Button>
										<Alert icon='HeroArrowUpRight' />
									</Link>
								</div>
							</CardBody>
						</Card>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default CandidatesProfilePage;
