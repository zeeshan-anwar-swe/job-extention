import Button from '../../../../../../components/ui/Button';
import { profileImageUrlValidationCheck } from '../../../../../../utils/validationCheck';

const AssignJobModalListItemPartial = () => {
	return (
		<div className='flex items-center justify-between gap-4 rounded-xl border-2 pr-2'>
			<div className='flex items-center gap-4'>
				<img
					className='aspect-square h-12'
					src={profileImageUrlValidationCheck('')}
					alt='progfile image'
				/>
				<h5>Olivia Jack</h5>
			</div>
			<Button className='h-fit' variant='solid'>
				Assign
			</Button>
		</div>
	);
};

export default AssignJobModalListItemPartial;
