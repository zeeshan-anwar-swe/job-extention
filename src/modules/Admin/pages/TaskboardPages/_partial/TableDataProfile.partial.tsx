import Button from '../../../../../components/ui/Button';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	imageUrl,
	title,
	subTitle,
}: {
	imageUrl?: string;
	title?: string;
	subTitle?: string;
}) => {
	return (
		<div>
			<div className='flex items-center justify-between '>
				<h3>{textValidationCheck(title)}</h3>
				<Button icon='HeroEllipsisHorizontal'></Button>
			</div>

			<div className='flex w-fit items-center gap-2 rounded-full border-2 border-zinc-300 pr-4'>
				<img
					className='aspect-square w-8 rounded-full'
					src={profileImageUrlValidationCheck(imageUrl)}
					alt='cadidate-image'
				/>
				<h6>{textValidationCheck(subTitle)}</h6>
			</div>
		</div>
	);
};

export default TableDataProfilePartial;
