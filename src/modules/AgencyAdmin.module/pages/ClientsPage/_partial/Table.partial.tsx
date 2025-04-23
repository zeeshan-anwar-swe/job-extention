import TableRowPartial from './TableRow.partial';
import Table, { TBody, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import { RootState } from '../../../../../store';
import { useSelector } from 'react-redux';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';

const TablePartial = () => {
	const { paginatedClients } = useSelector((state: RootState) => state.clients);
	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>NAME</Th>
					<Th>Hiring Rate</Th>
					<Th>Active Jobs</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</THead>
			<TBody>
				{paginatedClients.map((client: ClientListItemType) => (
					<TableRowPartial client={client} key={client.id} />
				))}
			</TBody>
			<TFoot>
				<Tr>
					<Th>NAME</Th>
					<Th>Hiring Rate</Th>
					<Th>Active Jobs</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
