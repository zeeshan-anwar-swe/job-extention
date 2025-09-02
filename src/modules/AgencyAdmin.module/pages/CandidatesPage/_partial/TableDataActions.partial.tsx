import { Link } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import { AssignClientToCandidateModalPartial } from './AssignJobToClientModal.partial';
import { AppDispatch } from '../../../../../store';
import { useDispatch } from 'react-redux';
import {
	assignClientToCandidate,
	getAgencyCandidatesList,
	removeAgencyCandidate,
} from '../../../../../store/slices/Candiates.slice';
import ConfirmationModal from '../../../../../components/modal/ConfirmationModal';
import { AssignClientModalPartial } from '../../../common/AssignClientModal/Modal.partial';
import { TCandidateJobProfile } from '../../../../../types/slices.type/candidate.slice.type';

const TableDataActionsPartial = ({
	candidate,
	selectedJob,
}: {
	candidate: any;
	selectedJob: TCandidateJobProfile;
}) => {
	const [assignClientModal, setAssignClientModal] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);

				console.log("TableDataActionsPartial",{candidate});
	

	return (
		<>
			<div className='flex justify-center'>
				<Button onClick={() => setAssignClientModal(true)}>Assign to Client</Button>
				<Link to='/dashboard/candidates/cv-edit' state={{ candidate, selectedJob }}>
					<Button>Edit CV</Button>
				</Link>
				<Link to='/dashboard/candidates/profile' state={{ candidate, selectedJob }}>
					<Button>View CV</Button>
				</Link>
				<Button onClick={() => setDeleteModal(true)}>Remove Candidate</Button>
				<ConfirmationModal
					onCloseAction={getAgencyCandidatesList({ page: 1, limit: 10 })}
					modal={deleteModal}
					setModal={setDeleteModal}
					title='delete candidate'
					action={removeAgencyCandidate(selectedJob.id)}
				/>
			</div>
			{assignClientModal && (
				<AssignClientModalPartial
					title={`Assign Client to Candiate: ${candidate?.name ?? ''}`}
					assignTo={candidate.id}
					modal={assignClientModal}
					setModal={setAssignClientModal}
				/>
			)}
		</>
	);
};

export default TableDataActionsPartial;
