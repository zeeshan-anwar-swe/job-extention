import { useSelector } from 'react-redux';
import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import { RootState } from '../../../../../store';
import TableRowPartial from './TableRow.partial';

const TablePartial = ( {sortBy}:{sortBy:string}) => {
	const { loading, rows, error, count, search } = useSelector(
		(state: RootState) => state.AdminSlice.adminList,
	);
	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>ADMIN NAME</Th>
					<Th>JOINED ON</Th>
					<Th>ROLE</Th>
					<Th>INVITED BY</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</THead>
			<TBody>
				{
					(sortBy === "Desending" ? [...rows].reverse() : rows).map((admin) => (
						<TableRowPartial key={admin.id} admin={admin} />
					))
				}
				
			</TBody>
			<TFoot>
				<Tr>
					<Th>ADMIN NAME</Th>
					<Th>JOINED ON</Th>
					<Th>ROLE</Th>
					<Th>INVITED BY</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
