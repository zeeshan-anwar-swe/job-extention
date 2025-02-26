import { useState } from 'react';
import { textValidationCheck } from '../../../../utils/validationCheck';
import Label from '../../../../components/form/Label';
import FieldWrap from '../../../../components/form/FieldWrap';
import Input from '../../../../components/form/Input';
import Icon from '../../../../components/icon/Icon';

const LabelTitlepartial = ({ label, detail }: { label?: string; detail?: string }) => {
	const [detailText, setDetailText] = useState<string | null | undefined>(detail || '');
	return (
		<div className='flex-1'>
			<Label htmlFor='title' className='font-light'>
				{textValidationCheck(label)}
			</Label>

			<FieldWrap firstSuffix={<Icon icon='HeroUser' className='mx-2' />}>
				<Input
					dimension='lg'
					id='name'
					autoComplete='name'
					name='name'
					value={detailText || ''}
					placeholder='Enter your name'
					onChange={(e) => setDetailText(e.target.value)}
				/>
			</FieldWrap>
		</div>
	);
};

export default LabelTitlepartial;
