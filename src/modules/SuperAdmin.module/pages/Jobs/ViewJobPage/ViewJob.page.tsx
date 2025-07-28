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
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import { profileImageUrlValidationCheck } from '../../../../../utils/validationCheck';
import TablePartial from './_partial/Table.partial';
import ResultUserDataPartial from './_partial/ResultUserData.partial';

const SuperAdminViewJobPage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Jobs' currentPage='View Job' />
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
					<Card className='col-span-8 flex flex-col gap-2  p-4 max-lg:col-span-12'>
						<CardHeader>
							<CardHeaderChild className='!block'>
								<CardTitle>Web Developer - Candidates</CardTitle>
								<CardSubTitle>Web Developer - Candidates</CardSubTitle>
							</CardHeaderChild>
							<CardHeaderChild>
								<Button variant='solid' color='red'>
									Delete Job
								</Button>
							</CardHeaderChild>
						</CardHeader>
						<CardBody>
							<TablePartial />
						</CardBody>
						<CardFooter>
							<ResultUserDataPartial />
							<ResultUserDataPartial />
						</CardFooter>
					</Card>
					<Card className='col-span-4 flex flex-col gap-2  p-4 max-lg:col-span-12'>
						<CardHeader className='!items-start'>
							<CardHeaderChild className='!block'>
								<CardTitle>Jobs Details</CardTitle>
								<CardSubTitle>Edit Job description and details.</CardSubTitle>
							</CardHeaderChild>
							<CardHeaderChild>
								<Button icon='HeroEllipsisHorizontal'></Button>
							</CardHeaderChild>
						</CardHeader>
						<CardHeader className=' !justify-start'>
							<Button
								variant='outline'
								color='zinc'
								rounded='rounded-full'
								className='!justify-start gap-2 !py-[2px] !pl-[2px] !pr-2'>
								<img
									className='aspect-square w-8'
									src={profileImageUrlValidationCheck('')}
									alt='profile-image'
								/>
								<span>Paul Walker</span>
							</Button>

							<Button
								variant='outline'
								color='zinc'
								rounded='rounded-full'
								className='!justify-start gap-2'>
								<span>In Progress</span>
							</Button>
						</CardHeader>
						<NavSeparator className='' />
						<CardHeader className=' !justify-start'>
							<Button
								variant='outline'
								color='zinc'
								rounded='rounded-full'
								className='!justify-start gap-2'>
								<span>Recruiter</span>
							</Button>
							<Button
								variant='outline'
								color='zinc'
								rounded='rounded-full'
								className='!justify-start gap-2 !py-[2px] !pl-[2px] !pr-2 '>
								<img
									className='aspect-square w-8'
									src={profileImageUrlValidationCheck('')}
									alt='profile-image'
								/>
								<span>Ornald Pholy</span>
							</Button>
						</CardHeader>

						<CardBody className='flex !h-fit flex-col gap-4'>
							<NavSeparator className='' />
							<LabelTitlepartial label='Job Title' detail='Web Developer' />
							<LabelTitlepartial label='No of position' detail='3' />
							<LabelTitlepartial label='Experience' detail='2-3 years' />
							<LabelTitlepartial label='Job Type' detail='Full Time' />
							<LabelTitlepartial label='Location' detail='Remote' />
							<LabelTitlepartial label='Skill Required' detail='MER Stack' />
						</CardBody>
						<CardFooter>
							<CardFooterChild>
								<Button variant='outline' color='zinc' borderWidth='border'>
									Cancel
								</Button>
								<Button variant='solid'>Save and update the job</Button>
							</CardFooterChild>
						</CardFooter>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SuperAdminViewJobPage;
