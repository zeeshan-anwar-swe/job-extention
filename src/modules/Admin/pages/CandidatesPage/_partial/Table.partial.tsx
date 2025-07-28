import TableRowPartial from './TableRow.partial';
import Table, { TBody, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';

const TablePartial = () => {
	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>CANDIDATE NAME</Th>
					<Th>PROGILE</Th>
					<Th>ROLE</Th>
					<Th>ACTIVE JOBS</Th>
					<Th>LOCATION</Th>
					<Th colSpan={2}>ACTION</Th>
				</Tr>
			</THead>
			<TBody className='text-center'>
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
				<TableRowPartial />
			</TBody>
			<TFoot>
				<Tr>
					<Th>CANDIDATE NAME</Th>
					<Th>PROGILE</Th>
					<Th>ROLE</Th>
					<Th>ACTIVE JOBS</Th>
					<Th>LOCATION</Th>
					<Th colSpan={2}>ACTION</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
