import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataPartial from './TableData.partial';
import TableDataActionsPartial from './TableDataActions.partial';

const TableRowPartial = () => {
	return (
		<Tr>
			<Td>
				<TableDataPartial
					title='Jane Cooper'
					subTitle='janecooper@hotmail'
					imageUrl='https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
				/>
			</Td>
			<Td>Web Developer</Td>

			<Td colSpan={2}>
				<TableDataActionsPartial />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
