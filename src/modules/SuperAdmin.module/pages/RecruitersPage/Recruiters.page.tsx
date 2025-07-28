import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, { SubheaderLeft } from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import SortDropdownPartial from './_partial/SortDropdown.partial';

const SuperAdminRecruitersPage = () => {
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
						<SearchPartial />
						<Button
							iconSize='text-5xl'
							rightIcon='HeroMicrophone'
							borderWidth='border'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='CustomKoalaHead'>
							Search with KoalaByte Talking Avatar
						</Button>

						<Button
							borderWidth='border'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroBarFilter'>
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
								<SortDropdownPartial />
								<Button variant='solid' rightIcon='HeroPaperAirplane'>
									Invite a Recruiter
								</Button>
							</CardHeaderChild>
						</CardHeader>
						<CardBody className='overflow-auto'>
							<TablePartial />
						</CardBody>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SuperAdminRecruitersPage;
