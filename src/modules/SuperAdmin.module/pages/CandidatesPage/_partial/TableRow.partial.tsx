import TableDataPartial from './TableData.partial';
import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataActionsPartial from './TableDataActions.partial';
import Button from '../../../../../components/ui/Button';

const TableRowPartial = () => {
	return (
		<Tr className='font-medium'>
			<Td>
				<TableDataPartial
					title='Jane Cooper'
					subTitle='janec@hotmail'
					imageUrl='https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
				/>
			</Td>
			<Td>
				<div className='flex items-center justify-center'>
					<Button iconSize='text-3xl' icon='HeroLinkedIn' />
				</div>
			</Td>

			<Td className='font-medium'>Product Manager</Td>

			<Td>5</Td>
			<Td>Lahore</Td>

			<Td colSpan={2}>
				<TableDataActionsPartial />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
