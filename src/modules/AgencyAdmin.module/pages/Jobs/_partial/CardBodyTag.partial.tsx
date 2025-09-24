import Button from '../../../../../components/ui/Button';
import { textValidationCheck } from '../../../../../utils/validationCheck';

const CardBodyTagPartial = ({ title, value }: { title: string; value: string }) => {
	return (
		<Button variant='outline' color='zinc' className='gap-2 max-md:!w-full'>
			<span className='truncate'>{textValidationCheck(title)}</span>
			<h5 className='truncate'>{textValidationCheck(value)}</h5>
		</Button>
	);
};

export default CardBodyTagPartial;
