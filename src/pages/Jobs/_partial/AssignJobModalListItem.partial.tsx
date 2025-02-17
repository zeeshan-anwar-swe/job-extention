import Button from '../../../components/ui/Button';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';

const AssignJobModalListItemPartial = () => {
	return (
		<div className='flex items-center justify-between gap-4 rounded-xl  pr-2'>
			<div className='flex items-center gap-4 rounded-xl bg-zinc-100 p-2'>
				<img
					className='aspect-square w-10 rounded-full object-cover'
					src={profileImageUrlValidationCheck('')}
					alt='profile-image'
				/>
				<h5>Olivia Oggy</h5>
			</div>
			<Button
				className='h-fit bg-white !text-blue-500 hover:!text-white'
				rounded='rounded-full'
				color='blue'
				variant='solid'>
				Assign
			</Button>
		</div>
	);
};

export default AssignJobModalListItemPartial;
