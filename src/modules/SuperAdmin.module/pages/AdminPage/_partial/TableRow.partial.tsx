import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataActionsPartial from './TableDataActions.partial';

const TableRowPartial = () => {
	return (
		<Tr className='font-medium'>
			<Td>
				<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
			</Td>
			<Td className='text-center'>12-Feb-2024</Td>
			<Td>Super Admin</Td>
			<Td>
				<TableDataProfilePartial title='Alina Jourge' />
			</Td>

			<Td colSpan={2}>
				<TableDataActionsPartial />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
