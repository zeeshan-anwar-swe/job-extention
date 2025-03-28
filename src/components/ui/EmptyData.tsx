import Icon from '../icon/Icon';
import { TFontSizes } from '../../types/fontSizes.type';
import { TColors } from '../../types/colors.type';
import { TColorIntensity } from '../../types/colorIntensities.type';
import { CardSubTitle } from './Card';

const EmptyData = ({
	color,
	message,
	className,
	colorIntensity,
	size,
}: {
	color?: TColors;
	message?: string;
	className?: string;
	size?: TFontSizes;
	colorIntensity?: TColorIntensity;
}) => {
	return (
		<div className={'flex h-full w-full items-center justify-center ' + className}>
			<div className='flex flex-col items-center justify-center gap-2'>
				<Icon
					color={color ?? 'amber'}
					colorIntensity={colorIntensity ?? '500'}
					size={size}
					icon='HeroFolderOpen'
				/>
				<CardSubTitle className='text-xl font-medium'>
					{message ?? 'no message'}
				</CardSubTitle>
			</div>
		</div>
	);
};

export default EmptyData;
