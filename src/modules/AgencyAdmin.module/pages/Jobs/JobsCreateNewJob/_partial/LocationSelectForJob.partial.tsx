import Card, { CardBody, CardHeader, CardTitle } from '../../../../../../components/ui/Card';
import { AppDispatch, RootState } from '../../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllCandidatesList,
	getLocationForCandidates,
	setCandidatesFilterOptions,
	setLoactionLoading,
} from '../../../../../../store/slices/Candiates.slice';
import SelectReact from '../../../../../../components/form/SelectReact';
import { useDebouncedCallback } from 'use-debounce';
import Label from '../../../../../../components/form/Label';
import FieldWrap from '../../../../../../components/form/FieldWrap';
import { FormData } from './CreateJobLeftSide.partial';

export const LocationSelectForJob = ({
	formData,
	setFormData,
}: {
	formData: FormData;
	setFormData: any;
}) => {
	const { loading, rows } = useSelector((state: RootState) => state.candidates.location);

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
	};

	const { filterOptions } = useSelector((state: RootState) => state.candidates);

	const handleLocationChange = async (event: any) => {
		console.log({ event });
		setFormData({ ...formData, location: event.label });

		await dispatch(
			setCandidatesFilterOptions({
				...filterOptions,
				location: [{ id: event.value, title: event.label }],
			}),
		);
		await dispatch(
			getAllCandidatesList({
				page: 1,
				limit: 10,
				filterOptions: {
					...filterOptions,
					location: [{ id: event.value, title: event.label }],
				},
			}),
		);
	};

	console.log({ rows });

	return (
		<div className='w-full'>
			<Label htmlFor='loaction' className='font-light'>
				Location
			</Label>

			<FieldWrap>
				<SelectReact
					name='location'
					isLoading={loading}
					placeholder='Search Location'
					options={
						rows?.length > 0
							? rows.map((location) => ({
									value: location.id ? location.id : location.locationId,
									label: location.title,
								}))
							: []
					}
					onInputChange={(value: string) => handlelocationinputChange(value)}
					onChange={handleLocationChange}
				/>
			</FieldWrap>
		</div>
	);
};
