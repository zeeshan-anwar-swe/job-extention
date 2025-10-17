import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { TInputTypes } from '../../types/input.type';
import themeConfig from '../../config/theme.config';
import { TRounded } from '../../types/rounded.type';
import { TBorderWidth } from '../../types/borderWidth.type';
import { TColors } from '../../types/colors.type';
import { TColorIntensity } from '../../types/colorIntensities.type';
import { IValidationBaseProps } from './Validation';
import Button from '../ui/Button'; 


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
        onChange, // Destructure original onChange
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        value, // We must exclude 'value' for file inputs
        ...rest
    } = props;

    // 1. STATE for File Name
    const [fileName, setFileName] = useState<string>('');
    const isFileInput = props.type === 'file';

    // 2. Custom Change Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFileInput && e.target.files && e.target.files.length > 0) {
            // Update local state with the file name
            setFileName(e.target.files[0].name);
        } else if (isFileInput && e.target.files && e.target.files.length === 0) {
            // Clear state if the selection is cancelled/cleared
            setFileName('');
        }
        
        // Call the original onChange prop if it was provided by the parent
        if (onChange) {
            onChange(e);
        }
    };


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
                'text-black dark:text-white dark:!border-white',
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

    const baseClasses = classNames(
        'w-full appearance-none outline-0',
        'text-black dark:text-white',
        'disabled:!opacity-25',
        themeConfig.transition,
        inputVariantClasses,
        inputValidationsClasses,
        className,
    );

    /*
     * Custom File Input Rendering Logic
     */
    if (isFileInput) {
        // We need to slightly adjust padding to make sure the file name is centered with the button text
        const fileDisplayPaddingClasses = inputDimensionClasses.replace(/px-[\d\.]+|py-[\d\.]+/g, '');
        
        // The display container will hold the button and the file name text
        const fileDisplayContainerClasses = classNames(
            baseClasses,
            'flex items-center justify-between gap-2', // Flexbox for side-by-side layout
            fileDisplayPaddingClasses,
            inputDimensionClasses.includes('xs') ? 'py-0.5 pl-1.5' : 
            inputDimensionClasses.includes('sm') ? 'py-1 pl-1.5' : 
            inputDimensionClasses.includes('default') ? 'py-1.5 pl-1.5' : 
            inputDimensionClasses.includes('lg') ? 'py-2 pl-1.5' : 
            'py-2.5 pl-1.5',
            'cursor-pointer', // Make the whole box look clickable
            rounded, // Apply rounded styles to the container
            'relative' // Needed for the hidden input overlay
        );
        
        // This class is applied to the text only, making it grow and truncate
        const fileNameTextClasses = classNames(
            'flex-1 min-w-0 truncate', // Ensure text doesn't push the button out
            {
                'text-zinc-400 dark:text-zinc-500': !fileName, // Grey out "Choose File" text
                'text-black dark:text-white': fileName,
            },
            inputDimensionClasses.includes('xs') ? 'text-xs' : 
            inputDimensionClasses.includes('sm') ? 'text-sm' : 
            inputDimensionClasses.includes('default') ? 'text-base' : 
            inputDimensionClasses.includes('lg') ? 'text-lg' : 
            'text-xl' 
        );


        return (
            <div 
                data-component-name='Input-File-Wrapper' 
                className={classNames('w-full', rounded)}
            >
                {/* The combination container that looks like an input field */}
                <div className={fileDisplayContainerClasses}>
                    
                    {/* The text area: shows the file name OR the default text */}
                    <span className={fileNameTextClasses}>
                        {fileName || 'No file chosen...'}
                    </span>
                    
                    {/* The Button component */}
                    <Button 
                        type="button" 
                        variant='solid'
                        
                        rounded={rounded}
                        color={color}
                        colorIntensity={colorIntensity}
                        className="flex-shrink-0 mr-2 pointer-events-none" // Ensure button doesn't shrink and ignores pointer events
                    >
                        Choose File
                    </Button>
                    
                    {/* The actual file input: Hidden, full size, and high opacity. 
                        It covers the entire container so clicking anywhere triggers the file dialog.
                    */}
                    <input
                        ref={ref}
                        data-component-name='Input-File-Hidden'
                        type="file"
                        className={classNames(
                            'absolute inset-0 z-10 cursor-pointer',
                            'w-full h-full opacity-0' // Visually hide but keep functional
                        )}
                        name={name}
                        onChange={handleChange}
                        {...rest}
                    />
                </div>
            </div>
        );
    }

    /*
     * RENDER NORMAL INPUT (text, number, email, etc.)
     */
    return (
        <input 
            ref={ref} 
            data-component-name='Input' 
            className={classNames(baseClasses, rounded)} 
            name={name} 
            onChange={handleChange}
            {...rest} 
        />
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
    variant: 'solid',
};
Input.displayName = 'Input';

export default Input;