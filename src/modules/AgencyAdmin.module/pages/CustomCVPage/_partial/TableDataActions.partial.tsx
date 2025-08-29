import { Link } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import ConfirmationModal from '../../../../../components/modal/ConfirmationModal';
import { TCustomCVUser } from '../../../../../types/slices.type/agency/custom-cv.slice.type';
import { deleteCustomCVById } from '../../../../../store/slices/Agency/CustomCV.slice';

const TableDataActionsPartial = ({ candidate }: { candidate: TCustomCVUser }) => {
	const [deleteModal, setDeleteModal] = useState<boolean>(false);

	return (
		<div className='flex justify-center'>
			{/* <Button onClick={() => setAssignClientModal(true)}>Assign to Client</Button> */}
			<Link to='/custom-cv/edit' state={candidate}>
				<Button>Edit CV</Button>
			</Link>
			<Link to='/custom-cv/view' state={candidate}>
				<Button>View CV</Button>
			</Link>
			<Button onClick={() => setDeleteModal(true)}>Remove CV</Button>
			<ConfirmationModal
				modal={deleteModal}
				setModal={setDeleteModal}
				title='Remove Custom CV'
				action={deleteCustomCVById(candidate.id)}
			/>
		</div>
	);
};

export default TableDataActionsPartial;
