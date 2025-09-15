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
	CardSubTitle,
	CardTitle,
} from '../../../../../components/ui/Card';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import HeaderPartial from './_partial/Header.partial';
import LabelTitleTextAreapartial from './_partial/LabelTitleTextArea.partial';
import ClientProfilePageCardPartial from './_partial/ClientProfilePageCard.partial';
import { AppDispatch, RootState } from '../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getClientDetails } from '../../../../../store/slices/Client.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';

const ClientProfilePage = () => {
	const { state } = useLocation();
	const { pageLoading, clientDetails, error } = useSelector((state: RootState) => state.clients);
	const dispatch: AppDispatch = useDispatch();
	const navigateTo = useNavigate();

	console.log({ state });

	useEffect(() => {
		if (state) {
			dispatch(getClientDetails(state?.id));
		} else {
			navigateTo('/dashboard/clients');
		}
	}, []);
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
			<PageWrapper name='Client Profile'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/dashboard/clients'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Clients
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<PageLoader loading={pageLoading} error={error} data={clientDetails}>
					<Container className='!grid !grid-cols-12  !gap-4'>
						{clientDetails && (
							<HeaderPartial state={state} clientDetails={clientDetails} />
						)}
						<Card className='col-span-8 flex flex-col gap-2 max-lg:col-span-12'>
							<CardHeader className='!block'>
								<CardTitle>Client Details</CardTitle>
								<CardSubTitle>Get an overview of the Client profile.</CardSubTitle>
							</CardHeader>
							<CardBody className='flex flex-col gap-4'>
								<div className='flex items-center gap-4 '>
									<LabelTitleTextAreapartial
										label='About'
										detail='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
									/>
								</div>

								<div className='flex items-center gap-4 max-md:flex-col '>
									<LabelTitlepartial label='Location' detail='Miami, USA' />
									<LabelTitlepartial label='Company' detail='KoalaByte AI' />
								</div>
								<div className='flex items-center gap-4 max-md:flex-col '>
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

						<Card className='col-span-4 flex flex-col gap-2 max-lg:col-span-12'>
							<CardHeader className='!flex-col !items-start gap-2'>
								<h1>Active Jobs</h1>
								<p className='font-light'>View the jobs assigned to candidate.</p>
							</CardHeader>
							<CardBody className='flex !flex-col gap-4'>
								<ClientProfilePageCardPartial />
								<ClientProfilePageCardPartial />
							</CardBody>
						</Card>
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default ClientProfilePage;
