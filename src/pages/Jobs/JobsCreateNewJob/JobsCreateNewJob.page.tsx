import React, { useState } from 'react';
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
	CardHeaderChild,
} from '../../../components/ui/Card';
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import ResultUserDataPartial from './_partial/ResultUserData.partial';
import SearchPartial from './_partial/Search.partial';
import CandidateCardPartial from './_partial/CandidateCard.partial';
import AssignJobModalPartial from '../_partial/AssignJob.partial';

const JobsCreateNewJobPage = () => {
	const [modal, setModal] = useState<boolean>(false);

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
					<Card className='col-span-8 flex flex-col gap-2 max-lg:col-span-12'>
						<CardHeader>
							<CardHeaderChild className='!flex-col !items-start '>
								<h1>Create a New Job</h1>
								<p>
									Effortlessly create jobs, assign candidates, send to a client.
								</p>
							</CardHeaderChild>
						</CardHeader>
						<CardBody className='gap-4'>
							<LabelTitlepartial
								label='Job Title'
								detail='Product Designer, UI/UX Designer'
							/>
							<div className='flex items-center gap-4'>
								<LabelTitlepartial label='No. of Positions' detail='3' />
								<LabelTitlepartial label='Experience' detail='3-5 Years' />
							</div>
							<div className='flex items-center gap-4'>
								<LabelTitlepartial label='Job Type' detail='Remote' />
								<LabelTitlepartial label='Location' detail='Miami' />
							</div>
							<LabelTitlepartial
								label='Skills Required'
								detail='Figma, Photoshop, Illustrator, Product Design, User Testing'
							/>
							<NavSeparator className='mt-8' />
						</CardBody>
						<CardFooter className='!flex-col !items-start'>
							<CardFooterChild>
								<h1>Assigned Candidates</h1>

								<div className='flex w-full items-center gap-4 max-md:flex-col max-md:items-start'>
									<ResultUserDataPartial />
									<ResultUserDataPartial />
									<ResultUserDataPartial />
								</div>
							</CardFooterChild>
							<CardFooterChild className='ml-auto'>
								<Button variant='outline' color='zinc' borderWidth='border'>
									Cancel
								</Button>
								<Button variant='solid'>Save Job</Button>
								<Button variant='solid' onClick={() => setModal(true)}>
									Assign To client
								</Button>
								<AssignJobModalPartial setModal={setModal} modal={modal} />
							</CardFooterChild>
						</CardFooter>
					</Card>

					<Card className='col-span-4 flex flex-col gap-2 max-lg:col-span-12'>
						<CardHeader>
							<CardHeaderChild>
								<div>
									<h1>Assign Candidates</h1>
									<p className='mb-0 mt-2'>Add Candidates to the Job</p>
								</div>
							</CardHeaderChild>
							<CardHeaderChild>
								<SearchPartial />
								<Button
									rounded='rounded-full'
									variant='outline'
									color='zinc'
									icon='HeroBarFilter'>
									Filter
								</Button>
							</CardHeaderChild>
						</CardHeader>

						<CardBody>
							<NavSeparator className='mb-8' />
							<div className='flex flex-col gap-4'>
								<CandidateCardPartial
									name='Alena Holmes'
									profession='Web Designer'
									experience='3 Years'
									location='Miami'
									availability='Yes'
									profileImageUrl=''
									linkedIn='https://linkedin.com/alena-holmes'
								/>

								<CandidateCardPartial
									name='Alena Holmes'
									profession='Web Designer'
									experience='3 Years'
									location='Miami'
									availability='Yes'
									profileImageUrl=''
									linkedIn='https://linkedin.com/alena-holmes'
									gitHub='https://github.com/alena-holmes'
								/>
								<CandidateCardPartial
									name='Alena Holmes'
									profession='Web Designer'
									experience='3 Years'
									location='Miami'
									availability='Yes'
									profileImageUrl=''
									linkedIn='https://linkedin.com/alena-holmes'
								/>
							</div>
						</CardBody>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default JobsCreateNewJobPage;
