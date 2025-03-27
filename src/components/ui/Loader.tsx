import Icon from '../icon/Icon';
import { TFontSizes } from '../../types/fontSizes.type';
import { TColors } from '../../types/colors.type';
import { TColorIntensity } from '../../types/colorIntensities.type';

const Loader = ({
	color,
	className,
	colorIntensity,
	size,
}: {
	color?: TColors;
	className?: string;
	size?: TFontSizes;
	colorIntensity?: TColorIntensity;
}) => {
	return (
		<div className={'flex h-full w-full items-center justify-center ' + className}>
			<Icon
				className='animate-spin transition-all ease-in-out'
				color={color ?? 'blue'}
				colorIntensity={colorIntensity ?? '100'}
				size={size}
				icon='DuoLoading'
			/>
		</div>
	);
};

export default Loader;
