import React, { FC, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import { IValidationBaseProps } from './Validation';
import { TBorderWidth } from '../../types/borderWidth.type';
import { TColors } from '../../types/colors.type';
import { TColorIntensity } from '../../types/colorIntensities.type';
import { TRounded } from '../../types/rounded.type';
import themeConfig from '../../config/theme.config';
import { TInputVariants } from './Input';

export type TTextareaVariants = 'solid';
export type TTextareaDimension = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

interface ITextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement>,
		Partial<IValidationBaseProps> {
	borderWidth?: TBorderWidth;
	className?: string;
	isActive?: boolean;
	color?: TColors;
	colorIntensity?: TColorIntensity;
	rounded?: TRounded;
	dimension?: TTextareaDimension;
	value?: string | number | readonly string[] | undefined;
	variant?: TTextareaVariants;
}
const Textarea: FC<ITextareaProps> = (props) => {
	const {
		borderWidth,
		className,
		color,
		colorIntensity,
		rounded,
		dimension,
		isActive,
		isValid,
		isTouched,
		invalidFeedback,
		variant,
		...rest
	} = props;

	const inputVariants: { [key in TInputVariants]: { general: string; validation: string } } = {
		solid: {
			general: classNames(
				// Default
				[`${borderWidth as TBorderWidth} border-zinc-100 dark:border-zinc-800`],
				'bg-zinc-100 dark:bg-zinc-800',
				// Hover
				[`hover:border-${color as TColors}-${colorIntensity as TColorIntensity}`],
				[`dark:hover:border-${color as TColors}-${colorIntensity as TColorIntensity}`],
				'disabled:!border-zinc-500',
				// Focus
				'focus:border-zinc-300 dark:focus:border-zinc-800',
				'focus:bg-transparent dark:focus:bg-transparent',
			),
			validation: classNames({
				'!border-red-500 ring-4 ring-red-500/30': !isValid && isTouched && invalidFeedback,
				'!border-green-500 focus:ring-4 focus:ring-green-500/30':
					!isValid && isTouched && !invalidFeedback,
			}),
		},
		outilned: {
			general: classNames(
				// Default
				'bg-transparent',
				[`${borderWidth as TBorderWidth}`],
				{
					[`border-${color as TColors}-${colorIntensity as TColorIntensity}/50`]:
						!isActive,
				},
				'text-black dark:text-white',
				// Hover
				[`hover:border-${color as TColors}-${colorIntensity as TColorIntensity}`],
				// Active
				[`active:border-${color as TColors}-${colorIntensity as TColorIntensity}`],
				{
					[`border-${color as TColors}-${colorIntensity as TColorIntensity}`]: isActive,
				},
			),
			validation: classNames({
				'!border-red-500 ring-4 ring-red-500/30': !isValid && isTouched && invalidFeedback,
				'!border-blue-500 focus:ring-4 focus:ring-blue-500/30':
					!isValid && isTouched && !invalidFeedback,
			}),
		},
	};
	const inputVariantClasses = inputVariants[variant as TTextareaVariants].general;
	const inputValidationsClasses = inputVariants[variant as TTextareaVariants].validation;

	/**
	 * Padding & Font Size & Icon Margin
	 */
	const inputDimension: { [key in TTextareaDimension]: { general: string } } = {
		xs: {
			general: classNames('px-1.5', 'py-0.5', 'text-xs'),
		},
		sm: {
			general: classNames('px-1.5', 'py-1', 'text-sm'),
		},
		default: {
			general: classNames('px-1.5', 'py-1.5', 'text-base'),
		},
		lg: {
			general: classNames('px-1.5', 'py-2', 'text-lg'),
		},
		xl: {
			general: classNames('px-1.5', 'py-2.5', 'text-xl'),
		},
	};
	const inputDimensionClasses = inputDimension[dimension as TTextareaDimension].general;

	const classes = classNames(
		'w-full appearance-none outline-0',
		'text-black dark:text-white',
		'disabled:!opacity-25',
		themeConfig.transition,
		inputVariantClasses,
		inputDimensionClasses,
		rounded,
		inputValidationsClasses,
		className,
	);

	return <textarea data-component-name='Textarea' className={classes} {...rest} />;
};
Textarea.defaultProps = {
	borderWidth: themeConfig.borderWidth,
	className: undefined,
	color: themeConfig.themeColor,
	colorIntensity: themeConfig.themeColorShade,
	rounded: themeConfig.rounded,
	dimension: 'default',
	value: '',
	variant: 'solid',
};
Textarea.displayName = 'Textarea';

export default Textarea;
