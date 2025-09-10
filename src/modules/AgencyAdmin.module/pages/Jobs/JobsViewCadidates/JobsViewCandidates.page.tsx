import { useEffect, useState } from 'react';
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
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/ui/Card';
import { Link, useLocation } from 'react-router-dom';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import TablePartial from './_partial/Table.partial';
import ResultUserDataPartial from './_partial/ResultUserData.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import { deleteJob, getJobDetails } from '../../../../../store/slices/Jobs.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import JobFormPartial from './_partial/JobForm.partial';
import { filterAndExtract, formatString } from '../../../../../utils/helper';
import AssignCandidatesModalPartial from '../../../../Shared/common/assignCandidateModal/AssignCandiatesModal.partial';
import { ConfirmationModal } from '../../../../Shared/components/CustomModal/confirmationModal';
import { AssignLinkedInCandiatesToJobModalPartial } from '../../../../Shared/common/assignLinkedInCandiatesToJobModal/assignLinkedInCandiatesToJobModal.partial';
import { cn } from '../../../../../utils/cn';

const JobsViewCandidatesPage = () => {
	const [modal, setModal] = useState<boolean>(false);
	const params = useLocation();
	const { state, pathname } = params;
	const isEditPage = pathname.includes('edit');

	const { jobDetails, pageLoading, error } = useSelector((state: RootState) => state.jobsSlice);
	const hiredCandidates = filterAndExtract({
		list: jobDetails?.candidateJobProfiles,
		numberOfReturnedItem: 2,
		key: 'status',
		valueForMatch: 'hired',
	});

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getJobDetails(state?.id ?? ''));
	}, []);

	const reFreshList = () => dispatch(getJobDetails(state?.id ?? ''));

	const [deleteModal, setDeleteModal] = useState<boolean>(false);

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
			<PageWrapper name={formatString(pathname)}>
				<Subheader>
					<SubheaderLeft>
						<Link to='/dashboard/jobs'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Jobs
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<PageLoader loading={pageLoading} error={error} data={jobDetails}>
					<Container className='grid grid-cols-12 gap-4 '>
						<Card
							className={cn(
								'col-span-7 flex flex-col gap-2  p-4 max-lg:col-span-12',
							)}>
							<CardHeader>
								<CardHeaderChild className='!flex-col !items-start '>
									<CardTitle>{`${jobDetails?.title as string} - Candidates`}</CardTitle>
									<CardSubTitle>
										Effortlessly manage candidates: assign and track{' '}
									</CardSubTitle>
								</CardHeaderChild>
								<CardHeaderChild>
									<Button
										onClick={() => setDeleteModal(true)}
										size='lg'
										color='red'
										variant='solid'
										rightIcon='HeroTrash'>
										Remove Job
									</Button>
									{jobDetails && deleteModal && (
										<ConfirmationModal
											modal={deleteModal}
											setModal={setDeleteModal}
											title='remove job'
											isRedirect={'/dashboard/jobs'}
											action={deleteJob(jobDetails.id)}
										/>
									)}
									<Button
										onClick={() => setModal(true)}
										size='lg'
										variant='solid'
										// icon='HeroPlus'
										rightIcon='HeroPlus'>
										Add More Candidates
									</Button>
									{jobDetails && modal&& (
										<AssignLinkedInCandiatesToJobModalPartial
											reFreshList={reFreshList}
											jobId={jobDetails.id}
											jobTitle={jobDetails?.title}
											modal={modal}
											setModal={setModal}
										/>
									)}
								</CardHeaderChild>
							</CardHeader>
							<CardBody className='max-h-[500px] overflow-y-scroll'>
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
