import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/authContext';
import { Roles } from '../../../../constants/role.enums';
import toast from 'react-hot-toast';

function PricingCard({
	planName,
	price,
	priceSubtext,
	description,
	buttonText,
	features,
	buttonBgColor = 'bg-white',
	buttonTextColor,
	recommended,
}: any) {
	const { userStorage, userTokenStorage } = useAuth();

	const navigateTo = useNavigate();

	const handleClick = () => {
		if (buttonText === 'Sign Up') {
			navigateTo('/signup');
		} else if (userStorage && userTokenStorage) {
			if (userStorage.role === Roles.AGENCY_ADMIN) {
				navigateTo('/dashboard/setting/subscription');
			} else {
				toast.error('Kindly sign in as agency');
				navigateTo('/signin');
			}
		} else {
			navigateTo('/signin');
		}
	};

	return (
		<div className='flex-1 space-y-4 rounded-2xl border-2 border-white bg-white/50 p-4'>
			<div className='flex items-start justify-between'>
				<div className='font-inter text-left text-lg font-semibold leading-7 text-[#475467]'>
					{planName}
				</div>
				{recommended && (
					<div className='font-inter cursor-pointer rounded-full border border-[#B2CCFF] bg-[#EFF4FF] p-1 text-center text-xs font-medium leading-5 text-[#004EEB]'>
						{recommended}
					</div>
				)}
			</div>
			<div className='text-left'>
				<span className=' text-[40px] font-semibold tracking-[-0.02em] text-[#101828] '>
					{price}
				</span>
				<span className=' text-base font-medium leading-6 text-[#475467]'>
					{priceSubtext}
				</span>
			</div>
			<div className='text-left  text-base font-normal leading-6 text-[#475467]'>
				{description}
			</div>
			<div>
				<button
					onClick={handleClick}
					className={`font-inter w-full cursor-pointer rounded-lg border border-[#C1C7CC] p-2 text-lg font-semibold leading-7 ${buttonTextColor} ${buttonBgColor}`}>
					{buttonText}
				</button>
			</div>
			<div className='h-px w-full bg-gray-400'></div>
			<div className='font-inter text-left text-base font-semibold leading-6 text-[#101828]'>
				Features
			</div>
			{features.map((feature: any, index: number) => (
				<div
					key={index}
					className='font-inter flex items-center text-base font-normal leading-6 text-[#475467]'>
					<img src="/assets/check.png" alt='check' className='mr-2' /> {feature}
				</div>
			))}
		</div>
	);
}

export default PricingCard;
