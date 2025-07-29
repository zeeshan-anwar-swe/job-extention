import Button from '../../../../../../components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '../../../../../../components/ui/Modal';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import Input from '../../../../../../components/form/Input';
import Label from '../../../../../../components/form/Label';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../../store';
import { useFormik } from 'formik';
import { inviteTeamMember } from '../../../../../../store/slices/Team.slice';
import Validation from '../../../../../../components/form/Validation';

type TValues = {
	name: string;
	email: string;
};

const InviteClientModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	const dispatch: AppDispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.name) {
				errors.name = 'Required';
			}

			if (!values.email) {
				errors.email = 'Required';
			}

			return errors;
		},
		onSubmit: (values: TValues) => {
			const { email, name } = values;
			dispatch(inviteTeamMember({ email, name })).then(() => {
				formik.resetForm();
			});
		},
	});

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Invite Client</ModalHeader>
			<NavSeparator />

			<ModalBody className='!flex !w-full !flex-col gap-4'>
				<div>
					<Label htmlFor='clientName'>Client Name*</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.name}
						invalidFeedback={formik.errors.name}
						validFeedback=''>
						<FieldWrap>
							<Input
								id='name'
								name='name'
								placeholder='Enter Client’s name'
								className='rounded-full'
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FieldWrap>
					</Validation>
				</div>
				<div>
					<Label htmlFor='clientEmail'>Client Email*</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.email}
						invalidFeedback={formik.errors.email}
						validFeedback=''>
						<FieldWrap>
							<Input
								type='email'
								id='email'
								name='email'
								placeholder='Enter Client’s email'
								className='rounded-full'
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FieldWrap>
					</Validation>
				</div>
			</ModalBody>
			<ModalFooter>
				<ModalFooterChild className='w-full pt-4'>
					<Button className='w-full' variant='outline' color='zinc'>
						Cancel
					</Button>

					<Button
						rightIcon='HeroPaperAirplane'
						onClick={() => setModal(false)}
						className='w-full'
						variant='solid'>
						Send Invitation
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default InviteClientModalPartial;
