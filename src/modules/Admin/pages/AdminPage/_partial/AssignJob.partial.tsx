import Button from '../../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../../components/ui/Modal';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Input from '../../../../../components/form/Input';
import Label from '../../../../../components/form/Label';
import Select from '../../../../../components/form/Select';
import Icon from '../../../../../components/icon/Icon';
import { useFormik } from 'formik';

const InviteModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	const options: string[] = ['Admin', 'SuperAdmin'];

	const formik = useFormik({
		initialValues: {
			clientName: '',
			clientEmail: '',
			adminRole: options[0], // Default to the first option
		},
		onSubmit: (values) => {
			console.log(values);
			setModal(false); // Close modal on submit
		},
	});

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Invite Client</ModalHeader>
			<NavSeparator />

			<ModalBody className='!flex !w-full !flex-col gap-4'>
				<div>
					<Label htmlFor='clientName'>Admin Name*</Label>
					<FieldWrap>
						<Input
							id='clientName'
							name='clientName'
							placeholder='Enter your team member name'
							className='rounded-full'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.clientName}
						/>
					</FieldWrap>
				</div>
				<div>
					<Label htmlFor='adminRole'>Choose Admin Role*</Label>
					<FieldWrap lastSuffix={<Icon icon='HeroChevronDown' className='mx-2' />}>
						<Select
							id='adminRole'
							name='adminRole'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.adminRole}
							placeholder='Select option'>
							{options.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
						</Select>
					</FieldWrap>
				</div>
				<div>
					<Label htmlFor='clientEmail'>Admin Email*</Label>
					<FieldWrap>
						<Input
							type='email'
							id='clientEmail'
							name='clientEmail'
							placeholder='Enter your team member email'
							className='rounded-full'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.clientEmail}
						/>
					</FieldWrap>
				</div>
			</ModalBody>
			<ModalFooter>
				<ModalFooterChild className='w-full pt-4'>
					<Button
						onClick={() => setModal(false)}
						className='w-full'
						variant='outline'
						color='zinc'>
						Cancel
					</Button>

					<Button
						rightIcon='HeroPaperAirplane'
						onClick={() => formik.handleSubmit()}
						className='w-full'
						variant='solid'>
						Send Invitation
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default InviteModalPartial;
