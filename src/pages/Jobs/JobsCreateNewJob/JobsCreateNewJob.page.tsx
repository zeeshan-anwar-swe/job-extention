import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../components/ui/Button';
import Breadcrumb from '../../../components/layouts/Breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';
import CreateJobLeftSidePartial from './_partial/CreateJobLeftSide.partial';
import CreateJobRightSidePartial from './_partial/CreateJobRightSide.partial';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setAssignedCandidatesWhileCreatingJob } from '../../../store/slices/Jobs.slice';

const JobsCreateNewJobPage = () => {
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		return () => {
			dispatch(setAssignedCandidatesWhileCreatingJob([]));
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
					<CreateJobLeftSidePartial />
					<CreateJobRightSidePartial />
				</Container>
			</PageWrapper>
		</>
	);
};

export default JobsCreateNewJobPage;
