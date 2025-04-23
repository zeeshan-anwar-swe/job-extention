import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';

const TablePartial = () => {
	const { paginatedList } = useSelector((state: RootState) => state.team);

	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>NAME</Th>
					<Th>% Jobs Closed</Th>
					<Th>Jobs in Progress</Th>
					<Th>backlog</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</THead>
			<TBody>
				{paginatedList.map((teamMember: any) => (
					<Tr key={teamMember.id}>
						<Td>
							<TableDataProfilePartial
								id={teamMember.id}
								image={teamMember.user.image}
								title={teamMember.user.name}
								subTitle={teamMember.user.email}
							/>
						</Td>

						<Td>
							<TableDataFeedbackPartial
								percentage={teamMember.jobsClosedPercentage}
							/>
						</Td>
						<Td className='text-center'>{teamMember.jobsInProgress}</Td>
						<Td className='text-center'>{teamMember.jobsInBackLog}</Td>
						<Td colSpan={2}>
							<TableDataActionsPartial teamMember={teamMember} />
						</Td>
					</Tr>
				))}
			</TBody>
			<TFoot>
				<Tr>
					<Th>NAME</Th>
					<Th>% Jobs Closed</Th>
					<Th>Jobs in Progress</Th>
					<Th>backlog</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
