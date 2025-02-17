import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	imageUrl,
	title,
	subTitle,
	className,
}: {
	imageUrl?: string;
	title?: string;
	subTitle?: string;
	className?: string;
}) => {
	return (
		<div className={'flex items-center justify-center gap-x-6 ' + className}>
			<img
				className='aspect-square w-10 rounded-full'
				src={profileImageUrlValidationCheck(imageUrl)}
				alt='cadidate-image'
			/>
			<div>
				<h5>{textValidationCheck(title)}</h5>
				<p>{textValidationCheck(subTitle)}</p>
			</div>
		</div>
	);
};

export default TableDataProfilePartial;
