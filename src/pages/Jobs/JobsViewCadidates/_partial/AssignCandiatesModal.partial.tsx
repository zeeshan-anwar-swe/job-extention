import Button from '../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../components/ui/Modal';
import SearchPartial from './Search.partial';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import AssignCandidatesModalListItemPartial from './AssignCandidatesModalList';

const AssignCandidatesModalPartial = ({
	modal,
	setModal,
	jobTitle,
}: {
	modal: boolean;
	setModal: any;
	jobTitle?: string;
}) => {
	const { candidatesList } = useSelector((state: RootState) => state.candidates);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Assign candidates to “{jobTitle ?? ''}” job</ModalHeader>
			<div className='p-4'>
				<SearchPartial />
			</div>

			<ModalBody className='!flex max-h-72 !w-full !flex-col !gap-4'>
				{candidatesList.map((candidate) => (
					<AssignCandidatesModalListItemPartial
						candidate={candidate}
						key={candidate.id}
					/>
				))}
			</ModalBody>
			<ModalFooter>
				<ModalFooterChild className='w-full pt-4 max-md:!flex-col'>
					<Button
						onClick={() => setModal(false)}
						className='w-full'
						variant='outline'
						color='zinc'>
						Cancel
					</Button>
					<Button onClick={() => setModal(false)} className='w-full' variant='solid'>
						Done
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default AssignCandidatesModalPartial;
