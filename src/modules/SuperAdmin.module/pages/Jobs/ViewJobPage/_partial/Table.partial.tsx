import Table, { TBody, TFoot, Th, THead, Tr } from '../../../../../../components/ui/Table';
import TableRowPartial from './TableRow.partial';

const TablePartial = () => {
	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>NAME</Th>
					<Th>FEEDBACK</Th>
					<Th>SOURCE</Th>
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
					<Th>NAME</Th>
					<Th>FEEDBACK</Th>
					<Th>SOURCE</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
