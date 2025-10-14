import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import Button from '../../../../../components/ui/Button';
import CreateJobLeftSidePartial from './_partial/CreateJobLeftSide.partial';
import CreateJobRightSidePartial from './_partial/CreateJobRightSide.partial';
import Container from '../../../../../components/layouts/Container/Container';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import {
	getDraftJobDetails,
	setAssignedCandidatesWhileCreatingJob,
	setClientWhileCreatingJob,
} from '../../../../../store/slices/Jobs.slice';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';

const JobsCreateNewJobPage = () => {
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {

		return () => {
			dispatch(setAssignedCandidatesWhileCreatingJob([]));
			dispatch(setClientWhileCreatingJob(null));
		};
	}, []);
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
			<PageWrapper name='Create Job'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/dashboard/jobs'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Jobs
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<Container className='grid grid-cols-12 gap-4'>
					<CreateJobLeftSidePartial />
					<CreateJobRightSidePartial />
				</Container>
			</PageWrapper>
		</>
	);
};

export default JobsCreateNewJobPage;
