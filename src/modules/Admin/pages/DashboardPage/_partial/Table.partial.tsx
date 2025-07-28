import Button from '../../../../../components/ui/Button';
import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import TableRowPartial from './TableRow.partial';

const TablePartial = () => {
	return (
		<>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>New Sign Ups</CardTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<Button variant='outline' color='zinc' rounded='rounded-full'>
						View All
					</Button>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='overflow-auto'>
				<Table className='table-fixed max-md:min-w-[70rem]'>
					<THead>
						<Tr>
							<Th>NAME</Th>
							<Th>ROLE</Th>
							<Th colSpan={2}>ACTION</Th>
						</Tr>
					</THead>
					<TBody className='text-center'>
						<TableRowPartial />
						<TableRowPartial />
						<TableRowPartial />
						<TableRowPartial />
					</TBody>
					<TFoot>
						<Tr>
							<Th>NAME</Th>
							<Th>ROLE</Th>
							<Th colSpan={2}>ACTION</Th>
						</Tr>
					</TFoot>
				</Table>
			</CardBody>
		</>
	);
};

export default TablePartial;
