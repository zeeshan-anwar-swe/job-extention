import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import { Link } from 'react-router-dom';

const TablePartial = () => {
	const { jobDetails } = useSelector((state: RootState) => state.jobsSlice);
	
	console.log({jobDetails});
	
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
						<Td className='flex justify-start'>
							<Link to="/dashboard/candidates/profile" state={{candidate:jobDetails, selectedJob: candidate}}>
								<TableDataProfilePartial
									imageUrl={candidate?.candidate?.profilePictureUrl}
									title={candidate.candidate.name}
									subTitle={candidate.candidate.email}
								/>
							</Link>
						</Td>

						<Td>
							<TableDataFeedbackPartial title={candidate.status} />
						</Td>
						<Td>
							<TableDataSourcePartial linkedInUrl={candidate?.resumeLink} />
						</Td>
						<Td colSpan={2}>
							<TableDataActionsPartial selectedJob={candidate} candidate={jobDetails} />
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
