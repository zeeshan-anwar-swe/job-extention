import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, { SubheaderLeft } from '../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import Card from '../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import { useEffect } from 'react';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { getClientsList } from '../../store/slices/Agency/Client.slice';

const ClientsPage = () => {
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		dispatch(getClientsList());
	}, []);
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Clents' currentPage='Manage Client' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<SearchPartial />
						<Button
							borderWidth='border-2'
							color='zinc'
							variant='outline'
							rounded='rounded-full'
							icon='HeroBarFilter'>
							Filter
						</Button>
					</SubheaderLeft>
				</Subheader>
				<Container className='!grid !grid-cols-12 !gap-4'>
					<div className='col-span-12 '>
						<Card className='h-full'>
							<TablePartial />
						</Card>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default ClientsPage;
