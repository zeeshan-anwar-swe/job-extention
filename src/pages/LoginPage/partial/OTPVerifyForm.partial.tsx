import { useEffect, useRef, useState } from 'react';
import Button from '../../../components/ui/Button';
import { CardTitle } from '../../../components/ui/Card';
import Alert from '../../../components/ui/Alert';
import { cn } from '../../../utils/cn';
import Input from '../../../components/form/Input';
import { useAuth } from '../../../context/authContext';
import toast from 'react-hot-toast';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { setFormType } from '../../../store/slices/ForgotPassword.slice';

const OTPVerifyFormPartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const { onOTPVerify } = useAuth();
	const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes in seconds
	const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
	const inputRefs = useRef<HTMLInputElement[]>([]);

	// Handle input change
	const handleChange = (index: number, value: string) => {
		if (isNaN(Number(value))) return; // Allow only numbers
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Auto-focus to next input
		if (value && index < 5 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1].focus();
		}
	};

	// Handle backspace
	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
			inputRefs.current[index - 1].focus();
		}
	};

	// Handle paste
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
		const newOtp = [...otp];
		pasteData.forEach((value, i) => {
			if (i < 6) newOtp[i] = value;
		});
		setOtp(newOtp);
	};

	// Focus the first input on mount
	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	// Timer logic
	useEffect(() => {
		if (timeLeft === 0) return;

		const timerId = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timerId);
	}, [timeLeft]);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
	};

	const isOtpComplete = otp.every((digit) => digit !== '');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const otpCode = `${otp.join('')}`;
		if (otpCode.length < 6) {
			toast.error('Fill All the fields');
			return;
		}
		onOTPVerify(otpCode);
	};

	return (
		<>
			<form className='flex flex-col items-center gap-4' onSubmit={handleSubmit}>
				<Alert
					icon='DuoShieldCheck'
					color='blue'
					variant='solid'
					rounded='rounded-full'
					iconSize='text-9xl'
				/>
				<CardTitle>Enter OTP</CardTitle>
				<div className='flex items-center justify-center space-x-2'>
					{otp.map((digit, index) => (
						<div key={index}>
							<Input
								color='blue'
								name={`${index}`}
								variant='outilned'
								type='text'
								maxLength={1}
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={handlePaste}
								ref={(el) => (inputRefs.current[index] = el!)}
								className={`h-12 w-12 text-center text-2xl font-semibold focus:outline-none	`}
							/>
						</div>
					))}
				</div>
				<div className='text-sm text-gray-600'>Time remaining: {formatTime(timeLeft)}</div>
				<div className='w-full'>
					<button
						className={cn(
							'w-full rounded-md bg-blue-500 py-2 text-white transition-all duration-300 ease-in-out hover:bg-blue-600',
							!isOtpComplete && ' opacity-50',
						)}
						type='submit'
						disabled={!isOtpComplete}>
						Verify
					</button>
				</div>
			</form>
			<div>
				<span className='mr-2 text-zinc-600 dark:text-zinc-100'>Wrong email!</span>
				<Button
					onClick={() => dispatch(setFormType('forgot'))}
					color='zinc'
					colorIntensity='800'
					className='!p-0 font-semibold hover:text-inherit'>
					Change Email
				</Button>
			</div>
			<div>
				<span className='mr-2 text-zinc-600 dark:text-zinc-100'>Want to login!</span>
				<Button
					onClick={() => dispatch(setFormType('login'))}
					color='zinc'
					colorIntensity='800'
					className='!p-0 font-semibold hover:text-inherit'>
					Log In
				</Button>
			</div>
		</>
	);
};

export default OTPVerifyFormPartial;
