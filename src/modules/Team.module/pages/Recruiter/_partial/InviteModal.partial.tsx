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
import { AppDispatch, RootState } from '../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Validation from '../../../../../components/form/Validation';
import { inviteTeamMember } from '../../../../../store/slices/Team.slice';
import { useEffect } from 'react';

type TValues = {
	name: string;
	email: string;
};

const InviteModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	const dispatch: AppDispatch = useDispatch();

	const { modalLoading, error } = useSelector((state: RootState) => state.team);

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
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email format';
			}

			return errors;
		},
		onSubmit: (values: TValues) => {
			const { email, name } = values;
			dispatch(inviteTeamMember({ email, name }));
		},
	});

	useEffect(() => {
		if (!modalLoading && !error) {
			formik.resetForm();
			setModal(false);
			// dispatch(getTeamlist());
		}
	}, [modalLoading, error]);

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Invite a Team Member</ModalHeader>
			<NavSeparator />

			<ModalBody className='!flex !w-full !flex-col gap-4'>
				<div>
					<Label htmlFor='clientName'>Team Member Name*</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.name}
						invalidFeedback={formik.errors.name}
						validFeedback=''>
						<FieldWrap>
							<Input
								id='clientName'
								name='name'
								placeholder='Enter your team member name'
								className='rounded-full'
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FieldWrap>
					</Validation>
				</div>
				<div>
					<Label htmlFor='clientEmail'>Team Member's Email*</Label>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.email}
						invalidFeedback={formik.errors.email}
						validFeedback=''>
						<FieldWrap>
							<Input
								id='clientEmail'
								name='email'
								placeholder='Enter your team member email'
								className='rounded-full'
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</FieldWrap>
					</Validation>
					{error && !formik.errors.email && (
						<div className='mt-1 text-sm text-red-500'>
							{typeof error === 'string' ? error : error.message}
						</div>
					)}
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
						isLoading={modalLoading}
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
