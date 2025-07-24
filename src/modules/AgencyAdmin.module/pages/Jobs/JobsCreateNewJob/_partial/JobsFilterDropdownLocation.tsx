import React, { ChangeEvent, FC } from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../../../components/ui/Card';
import { AppDispatch, RootState } from '../../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setCandidatesFilterOptions } from '../../../../../../store/slices/Candiates.slice';
import SelectReact from '../../../../../../components/form/SelectReact';

interface Props {
	formData: {
		location: string;
		skills: string[];
		experiences: number[];
	};
	setFormData: any;
}
export const JobsFilterDropdownLocation = () => {
	const dispatch: AppDispatch = useDispatch();

	const { filterOptions } = useSelector((state: RootState) => state.candidates);
	const handleLocationChange = (event: any) => {
		dispatch(setCandidatesFilterOptions({ ...filterOptions, location: event.value }));
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle className='!text-lg !font-medium'>Location</CardTitle>
			</CardHeader>
			<CardBody>
					<SelectReact
						name='location'
						placeholder='Search Location'
						options={[
							{ value: 'new-york', label: 'New York' },
							{ value: 'london', label: 'London' },
							{ value: 'lahore', label: 'Lahore' },
							{ value: 'sydney', label: 'Sydney' },
							{ value: 'denmark', label: 'Denmark' },
						]}
                        onChange={handleLocationChange}
					/>
			</CardBody>
		</Card>
	);
};
