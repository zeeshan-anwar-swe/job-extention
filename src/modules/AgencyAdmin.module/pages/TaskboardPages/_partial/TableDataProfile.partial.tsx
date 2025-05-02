import Button from '../../../../../components/ui/Button';
import Card, {
	CardBody,
	CardHeader,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/ui/Card';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import useImageValidation from '../../../../../hooks/useImageValidation';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	image,
	title,
	subTitle,
}: {
	image?: string;
	title?: string;
	subTitle?: string;
}) => {
	const { loading, imageUrl } = useImageValidation(image);
	return (
		<Card className='border-2'>
			<CardHeader className='!flex !flex-nowrap items-center justify-between '>
				<CardTitle className='break-all !text-lg'>{textValidationCheck(title)}</CardTitle>
				<Button icon='HeroEllipsisHorizontal'></Button>
			</CardHeader>

			<CardBody>
				<div className='flex w-fit items-center gap-4 rounded-full border border-zinc-300 pr-4'>
					<ImageLoaderWraper loading={loading} height='h-8'>
						<img
							className='aspect-square w-8 rounded-full'
							src={imageUrl}
							alt='cadidate-image'
						/>
					</ImageLoaderWraper>
					<CardSubTitle>Client: {textValidationCheck(subTitle)}</CardSubTitle>
				</div>
			</CardBody>
		</Card>
	);
};

export default TableDataProfilePartial;
