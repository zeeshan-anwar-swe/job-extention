import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import TableDataSourcePartial from './TableDataSource.partial';

const TablePartial = () => {
	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>NAME</Th>
					<Th>Feedback</Th>
					<Th>Source</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</THead>
			<TBody>
				<Tr>
					<Td>
						<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
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
						<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
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
						<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
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
						<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
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
						<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
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
					<Th>Feedback</Th>
					<Th>Source</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
