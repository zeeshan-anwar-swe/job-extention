import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Range } from 'react-date-range';
import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import PERIOD, { TPeriod } from '../../../constants/periods.constant';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../components/ui/Button';
import Breadcrumb from '../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../components/ui/Card';
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';
import Alert from '../../../components/ui/Alert';
import HeaderPartial from './_partial/Header.partial';
import TablePartial from './_partial/Table.partial';
import Badge from '../../../components/ui/Badge';
import TableDataFeedbackPartial from './_partial/TableDataFeedback.partial';
import ResultUserDataPartial from './_partial/ResultUserData.partial';
import SearchPartial from '../_partial/Search.partial';

const JobsViewCandidatesPage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Jobs' currentPage='View Candidates' />
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
							<CardHeaderChild className='!flex-col !items-start '>
								<h1>Web Developer - Candidates</h1>
								<p>Web Developer - Candidates</p>
							</CardHeaderChild>
							<CardHeaderChild>
								<Button size='xl' variant='solid' rightIcon='HeroEnvelope'>
									Email
								</Button>
								<Button size='xl' variant='solid' rightIcon='HeroPlus'>
									Assign to Candidate
								</Button>
							</CardHeaderChild>
						</CardHeader>
						<CardBody className=' overflow-scroll'>
							<TablePartial />
							<NavSeparator className='mt-8' />
						</CardBody>
						<CardFooter>
							<ResultUserDataPartial />
							<ResultUserDataPartial />
						</CardFooter>
					</Card>
					<Card className='col-span-4 flex flex-col gap-2  p-4 max-lg:col-span-12'>
						<CardHeader>
							<CardHeaderChild>
								<div>
									<h1>Jobs Details</h1>
									<p className='mb-0 mt-2'>Edit Job description and details.</p>
								</div>
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
								className='!justify-start gap-2 !py-0 !pl-0 !pr-2 '>
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
						<CardBody className='!h-fit gap-4'>
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
								<Button variant='outline'>Cancel</Button>
								<Button variant='solid'>Save and update the job</Button>
							</CardFooterChild>
						</CardFooter>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default JobsViewCandidatesPage;
