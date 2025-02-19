import Button from '../../../components/ui/Button';
import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../components/ui/Table';
import { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../../components/ui/Card';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataPositionPartial from './TableDataPosition.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import TableDataSourcePartial from './TableDataSource.partial';

const TablePartial = () => {
	return (
		<>
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
				<Table className='table-fixed max-md:min-w-[70rem]'>
					<THead>
						<Tr>
							<Th>NAME</Th>
							<Th>POSITION</Th>
							<Th>Feedback</Th>
							<Th>Source</Th>
							<Th colSpan={2}>Action</Th>
						</Tr>
					</THead>
					<TBody>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>
							<Td>
								<TableDataPositionPartial
									title='Software Engineer'
									subTitle='client: Phonix Baker'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial title='Fair' />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>
							<Td>
								<TableDataPositionPartial
									title='Software Engineer'
									subTitle='client: Phonix Baker'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial title='Hired' />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>
							<Td>
								<TableDataPositionPartial
									title='Software Engineer'
									subTitle='client: Phonix Baker'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial title='Over Qualify' />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>
							<Td>
								<TableDataPositionPartial
									title='Software Engineer'
									subTitle='client: Phonix Baker'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial title='Low Qualify' />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>
							<Td>
								<TableDataPositionPartial
									title='Software Engineer'
									subTitle='client: Phonix Baker'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial title='In Review' />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
					</TBody>
					<TFoot>
						<Tr>
							<Th>NAME</Th>
							<Th>POSITION</Th>
							<Th>Feedback</Th>
							<Th>Source</Th>
							<Th colSpan={2}>Action</Th>
						</Tr>
					</TFoot>
				</Table>
			</CardBody>
		</>
	);
};

export default TablePartial;
