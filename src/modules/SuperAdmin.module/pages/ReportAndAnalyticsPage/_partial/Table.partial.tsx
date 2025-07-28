import SearchPartial from './Search.partial';
import TableDataPartial from './TableData.partial';
import Button from '../../../../../components/ui/Button';
import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../../../../components/ui/Card';

const TablePartial = () => {
	return (
		<>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Candidates</CardTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<SearchPartial />
					<Button variant='solid'>View All Candidates</Button>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='overflow-auto'>
				<Table className='table-fixed max-md:min-w-[70rem]'>
					<THead>
						<Tr>
							<Th>NAME</Th>
							<Th>POSITION</Th>
							<Th>STATUS</Th>
						</Tr>
					</THead>
					<TBody>
						<Tr>
							<Td>
								<TableDataPartial
									title='Jane Cooper'
									subTitle='janecooper@hotmail'
									imageUrl='https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
								/>
							</Td>
							<Td>
								<TableDataPartial
									title='Regional Paradigm Technician'
									subTitle='Client: Phoenix Baker'
								/>
							</Td>

							<Td>
								<TableDataPartial status='Active' />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataPartial
									title='Jane Cooper'
									subTitle='janecooper@hotmail'
									imageUrl='https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
								/>
							</Td>
							<Td>
								<TableDataPartial
									title='Regional Paradigm Technician'
									subTitle='Client: Phoenix Baker'
								/>
							</Td>

							<Td>
								<TableDataPartial status='Active' />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataPartial
									title='Jane Cooper'
									subTitle='janecooper@hotmail'
									imageUrl='https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
								/>
							</Td>
							<Td>
								<TableDataPartial
									title='Regional Paradigm Technician'
									subTitle='Client: Phoenix Baker'
								/>
							</Td>

							<Td>
								<TableDataPartial status='Active' />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataPartial
									title='Jane Cooper'
									subTitle='janecooper@hotmail'
									imageUrl='https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
								/>
							</Td>
							<Td>
								<TableDataPartial
									title='Regional Paradigm Technician'
									subTitle='Client: Phoenix Baker'
								/>
							</Td>

							<Td>
								<TableDataPartial status='Active' />
							</Td>
						</Tr>
					</TBody>
					<TFoot>
						<Tr>
							<Th>NAME</Th>
							<Th>POSITION</Th>
							<Th>STATUS</Th>
						</Tr>
					</TFoot>
				</Table>
			</CardBody>
		</>
	);
};

export default TablePartial;
