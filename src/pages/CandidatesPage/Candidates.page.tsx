import { useEffect } from 'react';
import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, { SubheaderLeft } from '../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../components/ui/Card';
import SearchPartial from './_partial/Search.partial';
import { getCandidatesList } from '../../store/slices/Candiates.slice';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';

const CandidatesPage = () => {
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		dispatch(getCandidatesList());
	}, []);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Candidates' currentPage='Candidates' />
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
				<Container>
					<div className='grid grid-cols-12 gap-4'>
						<div className='col-span-12 '>
							<Card className='h-full'>
								<CardHeader>
									<CardHeaderChild className=''>
										<div>
											<CardTitle>Candidates</CardTitle>
											<p>View, manage, and track Candidates.</p>
										</div>
									</CardHeaderChild>
									<CardHeaderChild>
										<Button variant='solid' rightIcon='HeroArrowDown'>
											Download CVS
										</Button>
									</CardHeaderChild>
								</CardHeader>
								<CardBody className='overflow-auto'>
									<TablePartial />
								</CardBody>
							</Card>
						</div>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default CandidatesPage;
