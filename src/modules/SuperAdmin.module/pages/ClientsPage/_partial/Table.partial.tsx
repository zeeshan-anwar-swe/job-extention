import TableRowPartial from './TableRow.partial';
import Table, { TBody, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import { RootState } from '../../../../../store';
import { useSelector } from 'react-redux';
import {
	ClientListItemTypeSuperAdmin,
} from '../../../../../types/slices.type/clients.slice.type';

const TablePartial = ({ sortBy }: { sortBy: string }) => {
	const { paginatedClients } = useSelector((state: RootState) => state.SuperAdminClients);

	// Create a copy and conditionally reverse it
	const clientsToRender =
		sortBy === 'Desending' ? [...paginatedClients].reverse() : paginatedClients;

	return (
		<Table className='table-auto'>
			<THead>
				<Tr className='uppercase'>
					<Th>NAME</Th>
					<Th>JOINED ON</Th>
					<Th>Social</Th>
					<Th>Industry</Th>
					<Th>Active Jobs</Th>
					<Th>Invited By</Th>
					<Th>Action</Th>
				</Tr>
			</THead>
			<TBody>
				{/* Map over the potentially reversed list */}
				{clientsToRender.map((client: ClientListItemTypeSuperAdmin) => (
					<TableRowPartial client={client} key={client.id} />
				))}
			</TBody>
			<TFoot>
				<Tr className='uppercase'>
					<Th>NAME</Th>
					<Th>JOINED ON</Th>
					<Th>Social</Th>
					<Th>Industry</Th>
					<Th>Active Jobs</Th>
					<Th>Invited By</Th>
					<Th>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
