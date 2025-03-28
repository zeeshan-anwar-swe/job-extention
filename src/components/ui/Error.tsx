import Icon from '../icon/Icon';
import { TFontSizes } from '../../types/fontSizes.type';
import { TColors } from '../../types/colors.type';
import { TColorIntensity } from '../../types/colorIntensities.type';
import { CardSubTitle } from './Card';

const Error = ({
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
			<div className='flex flex-col items-center justify-center gap-4'>
				<Icon
					color={color ?? 'blue'}
					colorIntensity={colorIntensity ?? '500'}
					size={size}
					icon='HeroExclamationCircle'
				/>
				<CardSubTitle className='text-xl font-medium'>{`Error: ${message ?? 'no message'}`}</CardSubTitle>
			</div>
		</div>
	);
};

export default Error;
