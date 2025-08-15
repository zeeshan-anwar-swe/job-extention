import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataBacklogPartial from './TableDataBacklog.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import { RecruiterUserListITemType } from '../../../../../types/slices.type/agency/recruiters.slice.type';

const TableRowPartial = ({ recruiter }: { recruiter: RecruiterUserListITemType }) => {
	return (
		<Tr>
			<Td>
				<TableDataProfilePartial
					imageUrl={recruiter?.image}
					title={recruiter?.firstName ?? ''}
					subTitle={recruiter?.email ?? ''}
				/>
			</Td>
			<Td className='text-center'>
				<b>{recruiter.createdAt.slice(0, 10)}</b>
			</Td>
			<Td className='text-center'>
				<b>{recruiter.industry ?? ''}</b>
			</Td>
			<Td>
				<TableDataFeedbackPartial percentage={recruiter?.successRate} />
			</Td>
			<Td>
				<b>
					{recruiter?.location??""}
				</b>
			</Td>
			<Td colSpan={2}>
				<TableDataActionsPartial />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
