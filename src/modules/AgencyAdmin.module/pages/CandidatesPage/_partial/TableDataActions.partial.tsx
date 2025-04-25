import { Link } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import { AssignClientToCandidateModalPartial } from './AssignJobToClientModal.partial';
import { AppDispatch } from '../../../../../store';
import { useDispatch } from 'react-redux';
import { getAgencyCandidatesList, removeAgencyCandidate } from '../../../../../store/slices/Candiates.slice';
import ConfirmationModal from '../../../../../components/modal/ConfirmationModal';

const TableDataActionsPartial = ({ candidate }: { candidate: any }) => {
	const [clientModal, selectedDate] = useState<boolean>(false);
	const [deleteModal, setDeleteModal ] = useState<boolean>(false);


	
	
	return (
		<>
			<div className='flex justify-center'>
				<Button onClick={() => selectedDate(true)}>Assign to Client</Button>
				<Link to='/candidates/cv-edit' state={candidate}>
					<Button>Edit CV</Button>
				</Link>
				<Link to='/candidates/profile' state={candidate}>
					<Button>View CV</Button>
				</Link>
				<Button onClick={()=> setDeleteModal(true)}>Remove Candidate</Button>
				<ConfirmationModal onCloseAction={getAgencyCandidatesList({page:1, limit:10})} modal={deleteModal} setModal={setDeleteModal} title='delete candidate' action={removeAgencyCandidate(candidate.id)} />
			</div>
			<AssignClientToCandidateModalPartial modal={clientModal} setModal={selectedDate} />
		</>
	);
};

export default TableDataActionsPartial;
