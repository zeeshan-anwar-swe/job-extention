import Button from '../../../../../components/ui/Button';
import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import SearchPartial from './Search.partial';
import TableDataPartial from './TableData.partial';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import { useEffect } from 'react';
import { getSearchedAgencyCandidatesList } from '../../../../../store/slices/Candiates.slice';

const TablePartial = () => {
	const { candidatesList, pageLoading, error } = useSelector(
		(state: RootState) => state.candidates,
	);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getSearchedAgencyCandidatesList({ limit: 5, page: 1 }));
	}, []);

	return (
		<>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Candidates</CardTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<SearchPartial />
					<Link to={'/candidates'}>
						<Button variant='solid'>View All Candidates</Button>
					</Link>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='overflow-auto'>
				<PageLoader loading={pageLoading} error={error} data={candidatesList}>
					<Table className='table-fixed max-md:min-w-[70rem]'>
						<THead>
							<Tr>
								<Th>NAME</Th>
								<Th>POSITION</Th>
								<Th>STATUS</Th>
							</Tr>
						</THead>
						<TBody>
							{candidatesList.map((candidate) => (
								<Tr key={candidate.id}>
									<Td>
										<TableDataPartial
											title={candidate?.candidate?.name}
											subTitle={candidate?.candidate?.email}
											imageUrl={candidate?.candidate?.image}
										/>
									</Td>
									<Td>
										<TableDataPartial
											title={candidate?.title}
											subTitle={
												candidate?.client?.firstName +
												' ' +
												candidate?.client?.lastName
											}
										/>
									</Td>

									<Td className='text-center'>{candidate?.status}</Td>
								</Tr>
							))}
						</TBody>
						<TFoot>
							<Tr>
								<Th>NAME</Th>
								<Th>POSITION</Th>
								<Th>STATUS</Th>
							</Tr>
						</TFoot>
					</Table>
				</PageLoader>
			</CardBody>
		</>
	);
};

export default TablePartial;
