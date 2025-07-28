import { Td, Tr } from '../../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import Button from '../../../../../../components/ui/Button';

const TableRowPartial = () => {
	return (
		<Tr>
			<Td>
				<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
			</Td>

			<Td>
				<TableDataFeedbackPartial title='Fair' />
			</Td>

			<Td className='text-center'>
				<Button iconSize='text-3xl' icon='HeroLinkedIn' />
			</Td>

			<Td colSpan={2}>
				<TableDataActionsPartial />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
