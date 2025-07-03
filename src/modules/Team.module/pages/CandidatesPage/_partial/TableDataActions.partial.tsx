import { Link } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import {
	removeAgencyCandidate,
} from '../../../../../store/slices/Candiates.slice';
import ConfirmationModal from '../../../../../components/modal/ConfirmationModal';
import { AssignClientModalPartial } from '../../../../Shared/common/AssignClientModal/Modal.partial';
import { TCandidateJobProfile } from '../../../../../types/slices.type/candidate.slice.type';
import { getTeamCandidates } from '../../../../../store/slices/Team/Candidates.slice';

const TableDataActionsPartial = ({ candidate, selectedJob }: { candidate: any; selectedJob :TCandidateJobProfile }) => {
	const [assignClientModal, setAssignClientModal] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);

	

	return (
		<>
			<div className='flex justify-center'>
				{/* <Button onClick={() => setAssignClientModal(true)}>Assign to Client</Button> */}
				{/* <Link to='/candidates/cv-edit' state={{ candidate, selectedJob }}>
					<Button>Edit CV</Button>
				</Link> */}
				<Link to='/candidates/profile' state={{ candidate, selectedJob }}>
					<Button>View CV</Button>
				</Link>
				<Button onClick={() => setDeleteModal(true)}>Remove Candidate</Button>
				<ConfirmationModal
					onCloseAction={getTeamCandidates({ page: 1, limit: 10 })}
					modal={deleteModal}
					setModal={setDeleteModal}
					title='delete candidate'
					action={removeAgencyCandidate(selectedJob.id)}
				/>
			</div>
			
		</>
	);
};

export default TableDataActionsPartial;
