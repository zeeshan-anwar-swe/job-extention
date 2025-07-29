import { Td, Tr } from '../../../../../components/ui/Table';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import {  ClientListItemTypeSuperAdmin } from '../../../../../types/slices.type/clients.slice.type';
import TableDataProfilePartial from './TableDataProfile.partial';

const TableRowPartial = ({ client }: { client: ClientListItemTypeSuperAdmin }) => {
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
					<h4>{textValidationCheck(client?.jobCount)}</h4>
				</div>
			</Td>
			<Td>
				<div className='mx-auto flex w-fit'>
					<h4>{textValidationCheck(client?.jobCount)}</h4>
				</div>
			</Td>
			<Td>
				<div className='mx-auto flex w-fit'>
					<h4>{textValidationCheck(client?.jobCount)}</h4>
				</div>
			</Td>
			<Td>
				<TableDataProfilePartial inviteBy={client} />
				
			</Td>
			<Td >
				<TableDataActionsPartial client={client} />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
