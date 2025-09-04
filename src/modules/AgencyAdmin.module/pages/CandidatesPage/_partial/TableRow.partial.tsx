import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import {
	TCandidateJobProfile,
	TCandidateListItem,
} from '../../../../../types/slices.type/candidate.slice.type';
import { useState } from 'react';
import SelectReact from '../../../../../components/form/SelectReact';
import { formatString } from '../../../../../utils/helper';
import Alert from '../../../../../components/ui/Alert';
import { Link } from 'react-router-dom';

const TableRowPartial = ({ candidate }: { candidate: TCandidateListItem }) => {

	
	const [selectedJob, setSelectedJob] = useState<null | TCandidateJobProfile>(null);

	return (
		<Tr>
			<Td>
				<TableDataProfilePartial
					image={candidate?.profilePictureUrl}
					title={candidate?.name}
					subTitle={candidate?.email}
				/>
			</Td>

			<Td>
				<SelectReact
					variant='solid'
					placeholder='Select Position'
					className='!min-w-48 !border-zinc-300'
					name='job'
					options={candidate?.jobProfiles.map((job: any) => ({
						value: job,
						label: job.job.title,
					}))}
					onChange={(list: any) => setSelectedJob(list.value)}
				/>
			</Td>

			{selectedJob ? (
				<>
					<Td>
						{selectedJob.job.client?.clientUser.firstName??""}
					</Td>
					<Td>
						<TableDataFeedbackPartial title={formatString(selectedJob?.status ?? '')} />
					</Td>
					<Td>
						<Link className='mx-auto' target='_blank' to={candidate.publicProfileUrl}>
							<Alert className='!p-1' icon='HeroLinkedIn'></Alert>
						</Link>
					</Td>
					<Td colSpan={2}>
						<TableDataActionsPartial selectedJob={selectedJob} candidate={candidate} />
					</Td>
				</>
			) : (
				<Td className='text-center' colSpan={4}>
					Select Position
				</Td>
			)}
		</Tr>
	);
};

export default TableRowPartial;
