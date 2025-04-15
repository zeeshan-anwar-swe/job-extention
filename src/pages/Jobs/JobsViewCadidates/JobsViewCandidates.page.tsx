import { useEffect, useState } from 'react';
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
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../components/ui/Card';
import { Link, useLocation } from 'react-router-dom';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import TablePartial from './_partial/Table.partial';
import ResultUserDataPartial from './_partial/ResultUserData.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { getJobDetails } from '../../../store/slices/Jobs.slice';
import PageLoader from '../../../templates/layouts/main/PageLoader';
import JobFormPartial from './_partial/JobForm.partial';
import AssignCandidatesModalPartial from './_partial/AssignCandiatesModal.partial';
import { filterAndExtract } from '../../../utils/helper';

const JobsViewCandidatesPage = () => {
	const [modal, setModal] = useState<boolean>(false);
	const params = useLocation();
	const { state } = params;

	const { jobDetails, pageLoading, error } = useSelector((state: RootState) => state.jobsSlice);
	const hiredCandidates = filterAndExtract({
		list: jobDetails?.candidateJobProfiles,
		numberOfReturnedItem: 2,
		key: 'status',
		valueForMatch: 'hired',
	});

	console.log({ hiredCandidates });

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getJobDetails(state?.id ?? ''));
	}, []);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Jobs' currentPage='View Job Details' />
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
				<PageLoader loading={pageLoading} error={error} data={jobDetails}>
					<Container className='grid grid-cols-12 gap-4'>
						<Card className='col-span-8 flex flex-col gap-2  p-4 max-lg:col-span-12'>
							<CardHeader>
								<CardHeaderChild className='!flex-col !items-start '>
									<CardTitle>{`${jobDetails?.title as string} - Candidates`}</CardTitle>
									<CardSubTitle>
										Effortlessly manage candidates: assign and track{' '}
									</CardSubTitle>
								</CardHeaderChild>
								<CardHeaderChild>
									<Button size='xl' variant='solid' rightIcon='HeroEnvelope'>
										Email
									</Button>
									<Button
										onClick={() => setModal(true)}
										size='xl'
										variant='solid'
										rightIcon='HeroPlus'>
										Assign to Candidate
									</Button>
									<AssignCandidatesModalPartial
										jobTitle={jobDetails?.title}
										modal={modal}
										setModal={setModal}
									/>
								</CardHeaderChild>
							</CardHeader>
							<CardBody className=' overflow-scroll'>
								<TablePartial />
								<NavSeparator className='mt-8' />
							</CardBody>
							<CardFooter>
								{hiredCandidates.map((candidate) => (
									<ResultUserDataPartial
										candidate={candidate}
										key={candidate.id}
									/>
								))}
							</CardFooter>
						</Card>
						<JobFormPartial jobDetails={jobDetails} />
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default JobsViewCandidatesPage;
