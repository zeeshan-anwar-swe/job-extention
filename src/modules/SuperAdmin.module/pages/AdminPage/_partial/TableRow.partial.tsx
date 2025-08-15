import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import { AdminListItemType } from '../../../../../store/slices/SuperAdmin/Admin.slice';

const TableRowPartial = ({ admin }: { admin: AdminListItemType }) => {
	return (
		<Tr className='font-medium'>
			<Td>
				<TableDataProfilePartial title={admin.firstName} subTitle={admin.email} />
			</Td>
			<Td className='text-center'>12-Feb-2025</Td>
			<Td className='text-center'>{admin.role}</Td>
			<Td>
				{admin.inviter ?? ""}
			</Td>

			<Td colSpan={2}>
				<TableDataActionsPartial />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
