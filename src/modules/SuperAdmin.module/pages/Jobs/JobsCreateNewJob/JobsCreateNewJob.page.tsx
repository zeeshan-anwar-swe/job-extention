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
	CardTitle,
} from '../../../../../components/ui/Card';
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import ResultUserDataPartial from './_partial/ResultUserData.partial';
import ModalWithButtonPartial from './_partial/ModalWithButton.partial';

const JobsCreateNewJobPage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Jobs' currentPage='Create Job' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/jobs'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Jobs
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<Container className='grid grid-cols-12 gap-4'>
					<Card className='col-span-12 flex flex-col gap-2'>
						<CardHeader>
							<CardHeaderChild className='!flex-col !items-start '>
								<h1>Create a New Job</h1>
								<p>
									Effortlessly create jobs, assign candidates, send to a client.
								</p>
							</CardHeaderChild>
						</CardHeader>
						<CardBody className='flex flex-col gap-4'>
							<LabelTitlepartial
								label='Job Title'
								detail='Product Designer, UI/UX Designer'
							/>
							<div className='flex items-center gap-4 max-lg:flex-col'>
								<LabelTitlepartial label='No. of Positions' detail='3' />
								<LabelTitlepartial label='Experience' detail='3-5 Years' />
							</div>
							<div className='flex items-center gap-4 max-lg:flex-col'>
								<LabelTitlepartial label='Job Type' detail='Remote' />
								<LabelTitlepartial label='Location' detail='Miami' />
							</div>
							<LabelTitlepartial
								label='Skills Required'
								detail='Figma, Photoshop, Illustrator, Product Design, User Testing'
							/>
							<NavSeparator className='mt-8' />
						</CardBody>
						<CardFooter className='!flex-col !items-start max-sm:flex-row'>
							<CardFooterChild className='max-sm:w-full'>
								<CardTitle>Assigned Recruiter</CardTitle>
								<div className='flex w-full items-center gap-4 max-md:flex-col max-md:items-start'>
									<ResultUserDataPartial />
									<ResultUserDataPartial />
									<ResultUserDataPartial />
								</div>
							</CardFooterChild>
							<CardFooterChild className='ml-auto max-sm:mr-auto max-sm:w-full max-sm:flex-col-reverse max-sm:items-start'>
								<Button className='max-sm:w-full' variant='outline' color='zinc'>
									Cancel
								</Button>
								<Button className='max-sm:w-full' variant='solid'>
									Save Job
								</Button>
								<ModalWithButtonPartial />
							</CardFooterChild>
						</CardFooter>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default JobsCreateNewJobPage;
