import Container from '../../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../../components/ui/Button';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderPartial from './_partial/Header.partial';
import ClientJobCardPartial from './_partial/ClientJobCard.partial';
import { AppDispatch, RootState } from '../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getClientDetails } from '../../../../../store/slices/Agency/Client.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import { getJobsByClientId } from '../../../../../store/slices/Jobs.slice';
import { ClientJob } from '../../../../../types/slices.type/jobs.slice.type';

const ClientJobsPage = () => {
	const { state } = useLocation();
	const { loading, jobs, error } = useSelector((state: RootState) => state.jobsSlice.clientJobs);
	const { clientDetails } = useSelector((state: RootState) => state.clients);

	const dispatch: AppDispatch = useDispatch();
	const navigateTo = useNavigate();


	useEffect(() => {
		if (state) {
			dispatch(getJobsByClientId({ clientId: state.id }));
			dispatch(getClientDetails(state?.id));
		} else {
			navigateTo('/dashboard/clients');
		}
	}, []);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Clients' currentPage='Client Jobs' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Client Jobs'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/dashboard/clients'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Clients
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<PageLoader loading={loading} error={error} data={jobs}>
					<Container className='!grid !grid-cols-12  !gap-4'>
						{clientDetails && (
							<HeaderPartial state={state} clientDetails={clientDetails} />
						)}
						{jobs.map((job: ClientJob) => (
							<ClientJobCardPartial key={job.id} job={job} />
						))}
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default ClientJobsPage;
