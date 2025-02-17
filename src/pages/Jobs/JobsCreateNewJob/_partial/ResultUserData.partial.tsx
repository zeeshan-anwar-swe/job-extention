import TableDataFeedbackPartial from './TableDataFeedback.partial';
import { profileImageUrlValidationCheck } from '../../../../utils/validationCheck';
import { CardFooterChild } from '../../../../components/ui/Card';

const ResultUserDataPartial = () => {
	return (
		<div className='border-zinc-700- flex items-center gap-4 rounded-full border-2 pr-4'>
			<img
				className='aspect-square w-10 object-cover'
				src={profileImageUrlValidationCheck('')}
				alt=''
			/>
			<h4>Phonix Paul</h4>
		</div>
	);
};

export default ResultUserDataPartial;
