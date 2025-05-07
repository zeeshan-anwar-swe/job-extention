import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import { CardSubTitle, CardTitle } from '../../../../components/ui/Card';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getPaginatedTeamlist } from '../../../../store/slices/Team.slice';
import InviteModalPartial from './_partial/InviteModal.partial';
import Pagination from '../../../../components/ui/Pagination';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import { getRecruitersList } from '../../../../store/slices/Agency/Recruiter.slice';

const RecruitersPage = () => {
	const { rows,count,loading, error } = useSelector(
		(state: RootState) => state.recruiters.recruiterProfilerecruitersList,
	);

	console.log({ rows,count,loading, error });
	
	const [modal, setModal] = useState<boolean>(false);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Manage Team' currentPage='Manage Your Team' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<Button
							borderWidth='border-2'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroUserGroup'>
							All Members
						</Button>
						<Button
							borderWidth='border-2'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroArrowsUpDown'>
							Sort By
						</Button>
					</SubheaderLeft>
				</Subheader>
				<Subheader>
					<SubheaderLeft>
						<div>
							<CardTitle>Recruiters</CardTitle>
							<CardSubTitle>View top Recruiters suitable for your jobs</CardSubTitle>
						</div>
					</SubheaderLeft>
					<SubheaderRight>
						<Button onClick={() => setModal(true)} variant='solid' rightIcon='HeroPlus'>
							Add a Team Member
						</Button>
						<InviteModalPartial setModal={setModal} modal={modal} />
					</SubheaderRight>
				</Subheader>
				<PageLoader loading={loading} error={error} data={rows}>
					<Container>
						<div className=''>
							{/* <TablePartial /> */}
						</div>
					</Container>
				</PageLoader>
				<Pagination
					count={count}
					getListAction={getRecruitersList}
					limit={10}
				/>
			</PageWrapper>
		</>
	);
};

export default RecruitersPage;
