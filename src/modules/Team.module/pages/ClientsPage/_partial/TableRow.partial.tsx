import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataActionsPartial from './TableDataActions.partial';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';

const TableRowPartial = ({ client }: { client: ClientListItemType }) => {
	return (
		<Tr>
			<Td>
				<TableDataProfilePartial client={client} />
			</Td>

			<Td>
				<TableDataFeedbackPartial client={client} />
			</Td>
			<Td>
				<div className='mx-auto flex w-fit'>
					<h4>{textValidationCheck(client?.jobCounts)}</h4>
				</div>
			</Td>
			<Td colSpan={2}>
				<TableDataActionsPartial client={client} />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
