import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, { SubheaderLeft } from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import SortDropdownPartial from './_partial/SortDropdown.partial';
import Pagination from '../../../../components/ui/Pagination';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import {
	getRecruitersList,
	setSearchForAdminRecruitersList,
} from '../../../../store/slices/SuperAdmin/Recruiter.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import CustomSearchComponent from '../../../Shared/components/CustomSearch.component';

const SuperAdminRecruitersPage = () => {
	const { loading, rows, count, error, search } = useSelector(
		(state: RootState) => state.recruitersAdmin.reccruitersList,
	);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Recruiters' currentPage='Manage Recruiters' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Recruiters'>
				<Subheader>
					<SubheaderLeft>
						<CustomSearchComponent
							searchLimit={10}
							placeholder='Search Recruiters'
							searchListAction={getRecruitersList}
							setSearchActionForPagination={setSearchForAdminRecruitersList}
						/>
						<Button
							color='zinc'
							variant='outline'
							iconSize='text-5xl'
							borderWidth='border'
							icon='CustomKoalaHead'
							rounded='rounded-full'
							rightIcon='HeroMicrophone'>
							Search with KoalaByte Talking Avatar
						</Button>

						<Button
							color='zinc'
							variant='outline'
							borderWidth='border'
							icon='HeroBarFilter'
							rounded='rounded-full'>
							Filter
						</Button>
					</SubheaderLeft>
				</Subheader>
				<Container className='!grid !grid-cols-12 !gap-4'>
					<Card className='col-span-12 h-full'>
						<CardHeader>
							<CardHeaderChild className='!block'>
								<CardTitle>Recruiters</CardTitle>
								<p>View top Recruiters that signed up for KoalaByte.</p>
							</CardHeaderChild>
							<CardHeaderChild>
								{/* <SortDropdownPartial />	 */}
								<Button variant='solid' rightIcon='HeroPaperAirplane'>
									Invite a Recruiter
								</Button>
							</CardHeaderChild>
						</CardHeader>
						<CardBody className='overflow-auto'>
							<PageLoader loading={loading} error={error} data={rows}>
								<TablePartial />
							</PageLoader>
						</CardBody>
						<CardFooter>
							<Pagination
								limit={10}
								count={count}
								search={search}
								getListAction={getRecruitersList}
							/>
						</CardFooter>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SuperAdminRecruitersPage;
