import { Link, useLocation } from 'react-router-dom';
import Button from '../../../../../../components/ui/Button';
import { useState } from 'react';
import { removeAgencyCandidate } from '../../../../../../store/slices/Candiates.slice';
import { getJobDetails } from '../../../../../../store/slices/Jobs.slice';
import ConfirmationModal from '../../../../../../components/modal/ConfirmationModal';

const TableDataActionsPartial = ({ candidate }: { candidate: any }) => {
	const params = useLocation();
	const { state } = params;
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	return (
		<div className='flex justify-center'>
			<Link to={'/dashboard/candidates/cv-edit'} state={candidate}>
				<Button>Edit CV</Button>
			</Link>
			<Button onClick={() => setDeleteModal(true)}>Remove Candidate</Button>
			<ConfirmationModal
				onCloseAction={getJobDetails(state.id ?? '')}
				modal={deleteModal}
				setModal={setDeleteModal}
				title='remove candidate'
				action={removeAgencyCandidate(candidate.id)}
			/>
		</div>
	);
};

export default TableDataActionsPartial;
