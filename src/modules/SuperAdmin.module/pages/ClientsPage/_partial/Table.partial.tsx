import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import TableRowPartial from './TableRow.partial';

const TablePartial = () => {
	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>CLIENT NAME</Th>
					<Th>JOINED ON</Th>
					<Th>SOCIAL</Th>
					<Th>INDUSTRY</Th>
					<Th>ACTIVE JOBS</Th>
					<Th>INVITED BY</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</THead>
			<TBody>
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
			</TBody>
			<TFoot>
				<Tr>
					<Th>CLIENT NAME</Th>
					<Th>JOINED ON</Th>
					<Th>SOCIAL</Th>
					<Th>INDUSTRY</Th>
					<Th>ACTIVE JOBS</Th>
					<Th>INVITED BY</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
