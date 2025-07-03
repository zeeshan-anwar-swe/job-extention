import React, { useState } from 'react';
import {
	TCandidateJobProfile,
	TCandidateListItem,
} from '../../../../../types/slices.type/candidate.slice.type';
import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataPartial from './TableData.partial';
import SelectReact from '../../../../../components/form/SelectReact';
import { formatString } from '../../../../../utils/helper';
import TableDataFeedbackPartial from './TableDataFeedback.partial';

export const TableRowPartial = ({ candidate }: { candidate: TCandidateListItem }) => {
	const [selectedJob, setSelectedJob] = useState<null | TCandidateJobProfile>(null);
	return (
		<Tr>
			<Td>
				<TableDataPartial
					title={candidate?.name}
					subTitle={candidate?.email}
					imageUrl={candidate?.image}
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
			<Td className='text-center'>
				{!selectedJob ? (
					<p>Select Position</p>
				) : (
					<TableDataFeedbackPartial title={formatString(selectedJob?.status ?? '')} />
				)}
			</Td>
		</Tr>
	);
};
