import Label from '../../../../../../components/form/Label';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import SelectReact from '../../../../../../components/form/SelectReact';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import {
	getAllCandidatesList,
	setCandidatesFilterOptions,
} from '../../../../../../store/slices/Candiates.slice';
import { FormData } from './CreateJobLeftSide.partial';



export const ExperienceSelectForJobPartial = ({
	formData,
	setFormData,
}: {
	formData: FormData;
	setFormData: any;
}) => {
	const { filterOptions } = useSelector((state: RootState) => state.candidates);
	const dispatch: AppDispatch = useDispatch();

	const handleChange = (options: { label: string; value: string }) => {
		const { value, label } = options;

		setFormData({
			...formData,
			experience: label,
		});
		dispatch(setCandidatesFilterOptions({ ...filterOptions, tenure: { min: +value, max: +value } }));
		dispatch(
			getAllCandidatesList({
				page: 1,
				limit: 10,
				filterOptions: { ...filterOptions, tenure: { min: +value, max: +value } },
			}),
		);
	};

	return (
		<div className='w-full'>
			<Label htmlFor='experience' className='font-light'>
				Experience
			</Label>

			<FieldWrap>
				<SelectReact
					placeholder={'Select...'}
					// @ts-ignore
					onChange={handleChange}
					className='w-full'
					name='type'
					options={[
						{ value: '', label: '' },
						{ value: '1', label: '1 Year' },
						{ value: '2', label: '2 Years' },
						{ value: '3', label: '3 Years' },
						{ value: '4', label: '4 Years' },
						{ value: '5', label: '5 Years' },
						{ value: '6', label: '6 Years' },
						{ value: '7', label: '7 Years' },
						{ value: '8', label: '8 Years' },
						{ value: '9', label: '9 Years' },
						{ value: '10', label: '10 Years' },
						{ value: '11', label: '10+ Years' },
					]}
				/>
			</FieldWrap>
		</div>
	);
};
