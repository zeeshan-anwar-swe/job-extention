import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import Modal from '../../../../components/ui/Modal';
import SearchPartial from './Search.partial';
import Alert from '../../../../components/ui/Alert';

const AssignJobModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	return (
		<Modal isCentered isOpen={modal} setIsOpen={setModal}>
			<div className='flex w-full items-center justify-between p-4'>
				<h1>Assign Job</h1>
				<Button
					size='xl'
					rightIcon='HeroXMark'
					onClick={() => setModal(false)}
					className='h-fit'></Button>
			</div>
			<div className='flex w-full flex-col gap-4 p-4'>
				<SearchPartial />

				<div className='flex items-center pr-2 justify-between gap-4 rounded-xl border-2'>
					<div className='flex gap-4'>
						<Button icon='HeroFolder' className='h-fit'></Button>
						<div className=''>
							<div className='flex items-center gap-2'>
								<h5 className='m-0 p-0'>Web Designer </h5>
								<span>|</span>
								<span>3Year Experience </span>
								<span>|</span>
								<span>Miami</span>
							</div>
							<p>June 13, 2024</p>
						</div>
					</div>

					<Button className='h-fit' variant='solid'>
						Assign
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default AssignJobModalPartial;
