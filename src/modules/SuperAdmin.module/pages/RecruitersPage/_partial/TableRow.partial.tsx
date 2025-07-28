import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataBacklogPartial from './TableDataBacklog.partial';
import TableDataActionsPartial from './TableDataActions.partial';

const TableRowPartial = () => {
	return (
		<Tr>
			<Td>
				<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
			</Td>
			<Td className='text-center'>
				<b>Mar-17-2006</b>
			</Td>
			<Td>
				<TableDataSourcePartial />
			</Td>
			<Td>
				<TableDataFeedbackPartial percentage={20} />
			</Td>
			<Td>
				<b>
					<TableDataBacklogPartial />
				</b>
			</Td>
			<Td colSpan={2}>
				<TableDataActionsPartial />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
