import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../components/ui/Button';
import Breadcrumb from '../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
} from '../../../components/ui/Card';
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';
import Alert from '../../../components/ui/Alert';
import HeaderPartial from './_partial/Header.partial';
import LabelTitleTextAreapartial from './_partial/LabelTitleTextArea.partial';

const ClientProfilePage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Clients' currentPage='Clients Profile' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/clients'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Clients
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<Container>
					<HeaderPartial />
					<div className='mt-4 grid grid-cols-12 gap-4'>
						<Card className='col-span-8 flex flex-col gap-2  p-4 max-lg:col-span-12'>
							<CardHeader className='!block'>
								<h1>Client Details</h1>
								<p className='font-light'>Get an overview of the Client profile.</p>
							</CardHeader>
							<CardBody className='flex flex-col gap-4'>
								<div className='flex items-center gap-4 '>
									<LabelTitleTextAreapartial
										label='About'
										detail='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
									/>
								</div>

								<div className='flex items-center gap-4 '>
									<LabelTitlepartial label='Location' detail='Miami, USA' />
									<LabelTitlepartial label='Company' detail='KoalaByte AI' />
								</div>
								<div className='flex items-center gap-4 '>
									<LabelTitlepartial
										label='Designation'
										detail='CFO / Co Founder'
									/>
									<LabelTitlepartial
										label='Industry Sector'
										detail='Tech / Finance'
									/>
								</div>
							</CardBody>
							<CardFooter>
								<label className='font-light'>Social Media</label>
								<CardFooterChild className='w-full'>
									<Button
										className='gap-2'
										icon='HeroLinkedIn'
										rightIcon='HeroArrowUpRight'
										variant='outline'
										color='zinc'>
										LinkedIn
									</Button>
									<Button
										className='gap-2'
										icon='HeroGitHub'
										rightIcon='HeroArrowUpRight'
										variant='outline'
										color='zinc'>
										GitHub
									</Button>
									<Button
										className='gap-2'
										icon='HeroTwitterX'
										rightIcon='HeroArrowUpRight'
										variant='outline'
										color='zinc'>
										Twitter
									</Button>
									<Button
										className='gap-2'
										icon='HeroGlobeAlt'
										rightIcon='HeroArrowUpRight'
										variant='outline'
										color='zinc'>
										koalabyte.ai
									</Button>
								</CardFooterChild>
							</CardFooter>
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

								<Link
									target='_blank'
									to={'#'}
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
										<Button className='h-fit' icon='HeroLinkedIn' color='zinc'>
											Linked In
										</Button>
										<Alert icon='HeroArrowUpRight'>{''}</Alert>
									</Link>
									<Link
										target='_blank'
										to={'/'}
										className='flex items-center justify-between rounded-xl border-2 border-zinc-100'>
										<Button className='h-fit' icon='HeroGitHub' color='zinc'>
											Git Hub
										</Button>
										<Alert icon='HeroArrowUpRight'>{''}</Alert>
									</Link>
								</div>
							</Card>
						</div>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default ClientProfilePage;
