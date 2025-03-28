import { useEffect } from 'react';
import Modal, { ModalBody, ModalHeader } from '../../../components/ui/Modal';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { useFormik } from 'formik';
import Button from '../../../components/ui/Button';
import Input from '../../../components/form/Input';
import Icon from '../../../components/icon/Icon';
import FieldWrap from '../../../components/form/FieldWrap';
import Validation from '../../../components/form/Validation';
import Label from '../../../components/form/Label';
import { inviteClient } from '../../../store/slices/Agency/Client.slice';

interface TValues {
	clientName: string;
	clientEmail: string;
}

const AssignJobModalPartial = ({ modal, setModal }: { modal: boolean; setModal: any }) => {
	const dispatch: AppDispatch = useDispatch();
	const { modalLoading, error } = useSelector((state: RootState) => state.clients);

	const formik = useFormik({
		initialValues: {
			clientName: '',
			clientEmail: '',
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.clientName) {
				errors.clientName = 'Required';
			} else if (values.clientName.length < 2) {
				errors.clientName = 'Too Short';
			} else if (values.clientName.length > 50) {
				errors.clientName = 'Too Long';
			}

			if (!values.clientEmail) {
				errors.clientEmail = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.clientEmail)) {
				errors.clientEmail = 'Invalid email format';
			}

			return errors;
		},
		onSubmit: (values: TValues) => {
			dispatch(inviteClient({ name: values.clientName, email: values.clientEmail }));
		},
	});

	useEffect(() => {
		if (!modalLoading && !error) {
			formik.resetForm();
			setModal(false);
		}
	}, [modalLoading, error]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission
		formik.handleSubmit(); // Call Formik's submit handler
	};

	return (
		<Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
			<ModalHeader>Invite Client</ModalHeader>
			<NavSeparator />

			<ModalBody className='!flex !w-full !flex-col gap-4'>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4 py-4'>
					<div>
						<Label htmlFor='clientName'>Client Name</Label>
						<Validation
							isValid={!formik.errors.clientName && formik.touched.clientName}
							isTouched={formik.touched.clientName}
							invalidFeedback={formik.errors.clientName}
							validFeedback=''>
							<FieldWrap firstSuffix={<Icon icon='HeroUser' className='mx-2' />}>
								<Input
									dimension='lg'
									id='clientName'
									name='clientName'
									placeholder='Enter client name'
									value={formik.values.clientName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</FieldWrap>
						</Validation>
					</div>
					<div>
						<Label htmlFor='clientEmail'>Client Email</Label>
						<Validation
							isValid={!formik.errors.clientEmail && formik.touched.clientEmail}
							isTouched={formik.touched.clientEmail}
							invalidFeedback={formik.errors.clientEmail}
							validFeedback=''>
							<FieldWrap firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
								<Input
									dimension='lg'
									type='email'
									id='clientEmail'
									name='clientEmail'
									placeholder='Enter client email'
									value={formik.values.clientEmail}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</FieldWrap>
						</Validation>

						{error && !formik.errors.clientEmail && (
							<div className='mt-1 text-sm text-red-500'>
								{typeof error === 'string' ? error : error.message}
							</div>
						)}
					</div>
					<div className='flex items-center gap-4'>
						<Button
							onClick={() => {
								formik.resetForm();
								setModal(false);
							}}
							variant='outline'
							color='zinc'
							type='button' // Changed to type='button' to prevent form submission
							className='w-full font-semibold'>
							Cancel
						</Button>
						<Button
							isDisable={!formik.isValid || modalLoading}
							isLoading={modalLoading}
							variant='solid'
							rightIcon='HeroPaperAirplane'
							type='submit'
							className='w-full font-semibold'>
							Invite Client
						</Button>
					</div>
				</form>
			</ModalBody>
		</Modal>
	);
};

export default AssignJobModalPartial;
