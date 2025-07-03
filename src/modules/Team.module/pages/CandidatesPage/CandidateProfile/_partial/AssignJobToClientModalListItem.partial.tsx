import Button from '../../../../../../components/ui/Button';
import { profileImageUrlValidationCheck } from '../../../../../../utils/validationCheck';

const AssignJobToClientModalListItemPartial = () => {
	return (
		<div className='flex items-center justify-between gap-4 rounded-xl bg-zinc-100 p-2 pr-2 dark:bg-zinc-800'>
			<div className='flex w-full items-center gap-4 rounded-xl '>
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

export default AssignJobToClientModalListItemPartial;
