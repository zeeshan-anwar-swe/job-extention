import React, { ChangeEvent, FC } from 'react';
import Card, { CardBody, CardHeader, CardTitle } from '../../../../../../components/ui/Card';
import { AppDispatch, RootState } from '../../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
	getLocationForCandidates,
	setCandidatesFilterOptions,
	setLoactionLoading,
} from '../../../../../../store/slices/Candiates.slice';
import SelectReact from '../../../../../../components/form/SelectReact';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
	formData: {
		location: string;
		skills: string[];
		experiences: number[];
	};
	setFormData: any;
}
export const JobsFilterDropdownLocation = () => {
	const { loading, count, rows } = useSelector((state: RootState) => state.candidates.location);

	const dispatch: AppDispatch = useDispatch();

	const debounced = useDebouncedCallback((value) => {
		
		if (value) {
			dispatch(getLocationForCandidates({ page: 1, limit: 10, keywords: value }));
		}
	}, 700);

	const handlelocationinputChange = (value: string) => {
		if (value) {
			dispatch(setLoactionLoading(true));
			debounced(value);
		} 

	}

	
	

	const { filterOptions } = useSelector((state: RootState) => state.candidates);

	console.log({ filterOptions });
	
	const handleLocationChange = (event: any) => {

		console.log('Location changed:', event);
		
		dispatch(setCandidatesFilterOptions({ ...filterOptions, location: [{ id: event.value, title: event.label }] }));
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle className='!text-lg !font-medium'>Location</CardTitle>
			</CardHeader>
			<CardBody>
				<SelectReact
					name='location'
					isLoading={loading}
					placeholder='Search Location'
					options={
						rows?.length > 0
							? rows.map((location) => ({
									value: location.id,
									label: location.title,
								}))
							: [
									
								]
					}
					onInputChange={(value: string) => handlelocationinputChange(value)}
					onChange={handleLocationChange}
				/>
			</CardBody>
		</Card>
	);
};
