import React from 'react';
import { Td, Tr } from '../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataPositionPartial from './TableDataPosition.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import TableDataActionsPartial from './TableDataActions.partial';

const TableRowPartial = ({ candidate }: { candidate: any }) => {
	return (
		<Tr>
			<Td>
				<TableDataProfilePartial title='Alina Jourge' subTitle='alina@gmail.com' />
			</Td>
			<Td>
				<TableDataPositionPartial
					title='Software Engineer'
					subTitle='client: Phonix Baker'
				/>
			</Td>

			<Td>
				<TableDataFeedbackPartial title='Fair' />
			</Td>
			<Td>
				<TableDataSourcePartial />
			</Td>
			<Td colSpan={2}>
				<TableDataActionsPartial candidate={candidate} />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
