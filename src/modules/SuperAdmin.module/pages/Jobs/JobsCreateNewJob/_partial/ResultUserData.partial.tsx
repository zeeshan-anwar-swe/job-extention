import { useDispatch } from 'react-redux';
import Icon from '../../../../../../components/icon/Icon';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../../utils/validationCheck';
import { AppDispatch } from '../../../../../../store';
import { assignCandidateWhileCreatingJob } from '../../../../../../store/slices/Jobs.slice';
import useImageValidation from '../../../../../../hooks/useImageValidation';

const ResultUserDataPartial = ({ candidate }: any) => {
	const dispatch: AppDispatch = useDispatch();

	const {loading, imageUrl} = useImageValidation(candidate.profilePictureUrl);
	
	return (
		<div className='group relative flex items-center gap-4 rounded-full border border-zinc-300 pr-4 hover:cursor-pointer'>
			<Icon
				onClick={() => dispatch(assignCandidateWhileCreatingJob(candidate))}
				className='absolute -right-2 -top-3 rounded-full bg-red-500 p-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'
				size='text-2xl'
				icon='HeroXMark'
				color='zinc'
				colorIntensity='100'
			/>
			<img
				className='aspect-square rounded-full w-10 object-cover'
				src={imageUrl}
				alt='cadidate-profile'
			/>
			<h4>{textValidationCheck(candidate?.name)}</h4>
		</div>
	);
};

export default ResultUserDataPartial;
