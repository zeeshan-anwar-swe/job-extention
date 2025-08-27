import React, { useEffect } from 'react';
import Label from '../../../../../../components/form/Label';
import RichText from '../../../../../../components/RichText';
import { JobFormData } from './JobForm.partial';
import { Descendant } from 'slate';

export const TextEditorForJobDetailsPagePartial = (
	// handleRichTextChange: any,
	formData: JobFormData
) => {
    console.log({ formData });
    

    const [value, setValue] = React.useState<any[]>([]);

    useEffect(()=>{
        if(Array.isArray(formData.description)){
            setValue(formData.description);
        }
    },[formData.description])

	return (
		<div className='w-full'>
			<Label htmlFor='description'>Description</Label>
			<RichText
				id='description'
                value={value}
				className='min-h-48'
				handleChange={setValue}
			/>
		</div>
	);
};
