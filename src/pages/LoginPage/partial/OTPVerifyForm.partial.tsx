import { useState } from 'react';
import Validation from '../../../components/form/Validation';
import { useAuth } from '../../../context/authContext';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import classNames from 'classnames';
import Icon from '../../../components/icon/Icon';
import FieldWrap from '../../../components/form/FieldWrap';
import Input from '../../../components/form/Input';
import Button from '../../../components/ui/Button';
import Container from '../../../components/layouts/Container/Container';
import { CardTitle } from '../../../components/ui/Card';
import Alert from '../../../components/ui/Alert';

type TValues = {
	username: string;
};

const OTPVerifyFormPartial = ({ setFormType }: { setFormType: (value: string) => void }) => {
	const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

	return (
		<form className=' flex flex-col items-center gap-4'>
			<Alert
				icon='DuoShieldCheck'
				color='blue'
				variant='solid'
				rounded='rounded-full'
				iconSize='text-9xl'
			/>
			<CardTitle>Enter OTP</CardTitle>
			<section className='flex items-center gap-4'>
				{otp.map((_, index) => (
					<Input
						className=' !border-blue-500 text-center font-semibold text-blue-500 outline-dashed dark:text-white'
						variant='solid'
						color='blue'
						key={index}
						maxLength={1}
						type='text'
						id={`otp-${index}`}
						name={`otp-${index}`}
						value={otp[index]}
						onChange={(e) => {
							const newOtp = [...otp];
							newOtp[index] = e.target.value;
							setOtp(newOtp);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Backspace') {
								const newOtp = [...otp];
								newOtp[index] = '';
								setOtp(newOtp);
							} else {
								const newOtp = [...otp];
								newOtp[index] = e.key;
								setOtp(newOtp);
							}
						}}
					/>
				))}
			</section>

			<div className='w-full'>
				<Button size='lg' variant='solid' className='w-full font-semibold'>
					Verify
				</Button>
			</div>
		</form>
	);
};

export default OTPVerifyFormPartial;
