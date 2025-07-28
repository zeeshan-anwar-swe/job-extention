import Button from '../../../../../../components/ui/Button';
import { profileImageUrlValidationCheck } from '../../../../../../utils/validationCheck';

const ResultUserDataPartial = () => {
	return (
		<Button
			className='gap-2 !py-0 !pl-1 max-sm:w-full'
			rounded='rounded-full'
			variant='outline'
			borderWidth='border'
			color='zinc'>
			<img
				className='aspect-square w-10 object-cover'
				src={profileImageUrlValidationCheck('')}
				alt=''
			/>
			<h4>Phonix Paul</h4>
		</Button>
	);
};

export default ResultUserDataPartial;
