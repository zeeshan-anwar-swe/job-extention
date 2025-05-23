import React, { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { TInputTypes } from '../../types/input.type';
import themeConfig from '../../config/theme.config';
import { TRounded } from '../../types/rounded.type';
import { TBorderWidth } from '../../types/borderWidth.type';
import { TColors } from '../../types/colors.type';
import { TColorIntensity } from '../../types/colorIntensities.type';
import { IValidationBaseProps } from './Validation';

export type TInputVariants = 'solid' | 'outilned';
export type TInputDimension = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>, Partial<IValidationBaseProps> {
	borderWidth?: TBorderWidth;
	className?: string;
	color?: TColors;
	colorIntensity?: TColorIntensity;
	name: string;
	isActive?: boolean;
	rounded?: TRounded;
	dimension?: TInputDimension;
	type?: TInputTypes;
	value?: string | number | readonly string[] | undefined;
	variant?: TInputVariants;
}
const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
	const {
		borderWidth,
		className,
		color,
		colorIntensity,
		name,
		isActive,
		rounded,
		dimension,
		variant,
		isValid,
		isTouched,
		invalidFeedback,
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
				'!border-red-500 ring-4 ring-red-500/30 animate-shake':
					!isValid && isTouched && invalidFeedback,
				'!border-blue-500 focus:ring-4 focus:ring-blue-500/30':
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
	const inputVariantClasses = inputVariants[variant as TInputVariants].general;
	const inputValidationsClasses = inputVariants[variant as TInputVariants].validation;

	/**
	 * Padding & Font Size & Icon Margin
	 */
	const inputDimension: { [key in TInputDimension]: { general: string } } = {
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
	const inputDimensionClasses = inputDimension[dimension as TInputDimension].general;

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

	return (
		<input ref={ref} data-component-name='Input' className={classes} name={name} {...rest} />
	);
});
Input.defaultProps = {
	borderWidth: themeConfig.borderWidth,
	className: undefined,
	color: themeConfig.themeColor,
	colorIntensity: themeConfig.themeColorShade,
	rounded: themeConfig.rounded,
	dimension: 'default',
	type: 'text',
	value: '',
	variant: 'solid',
};
Input.displayName = 'Input';

export default Input;
