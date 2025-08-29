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
import { TCustomCVUser } from '../../../../../types/slices.type/agency/custom-cv.slice.type';
import { calculateTotalExperience } from '../../../../../utils/linkedin.util';

const TableRowPartial = ({ candidate }: { candidate: TCustomCVUser }) => {
	return (
		<Tr>
			<Td>
				<TableDataProfilePartial
					image={candidate?.profilePictureUrl}
					title={candidate?.name}
					subTitle={candidate?.headline}
				/>
			</Td>

			<Td className='text-center'>{candidate?.industry}</Td>

			<Td className='text-center'>{candidate?.location}</Td>
			<Td className='text-center'>{calculateTotalExperience(candidate?.workExperience)}</Td>

			<Td colSpan={2}>
				<TableDataActionsPartial candidate={candidate} />
			</Td>
		</Tr>
	);
};

export default TableRowPartial;
