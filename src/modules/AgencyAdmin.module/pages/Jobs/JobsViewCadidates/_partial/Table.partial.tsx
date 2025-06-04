import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';

const TablePartial = () => {
	const { jobDetails } = useSelector((state: RootState) => state.jobsSlice);
	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>NAME</Th>
					<Th>Feedback</Th>
					<Th>Source</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</THead>
			<TBody>
				{jobDetails?.candidateJobProfiles?.map((candidate: any) => (
					<Tr key={candidate.id}>
						<Td>
							<TableDataProfilePartial
								title={candidate.candidate.name}
								subTitle={candidate.candidate.email}
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
				))}
			</TBody>
			<TFoot>
				<Tr>
					<Th>NAME</Th>
					<Th>Feedback</Th>
					<Th>Source</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
