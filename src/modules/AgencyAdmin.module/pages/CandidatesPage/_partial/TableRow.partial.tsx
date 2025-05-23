import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataPositionPartial from './TableDataPosition.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import TableDataActionsPartial from './TableDataActions.partial';

const TableRowPartial = ({ candidate }: { candidate: any }) => {
	return (
		<Tr>
			<Td>
				<TableDataProfilePartial
					image={candidate?.candidate?.image}
					title={candidate?.candidate?.name}
					subTitle={candidate?.candidate?.email}
				/>
			</Td>
			<Td>
				<TableDataPositionPartial
					title={candidate?.title}
					subTitle={candidate?.client?.firstName ?? ''}
				/>
			</Td>

			<Td>
				<TableDataFeedbackPartial title='Fair' />
			</Td>
			<Td>
				<TableDataSourcePartial />
			</Td>
			<Td colSpan={2}>
				<TableDataActionsPartial candidate={candidate} />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
