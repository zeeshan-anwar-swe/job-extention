import { FormikProps } from 'formik';
import { EditCVFormValues } from '../CandidateCVEdit.page';
import SelectReact from '../../../../../../components/form/SelectReact';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import { getJobsList } from '../../../../../../store/slices/Jobs.slice';
import Validation from '../../../../../../components/form/Validation';
import getMissingObjects from '../../../../../../utils/array.util';

export const JobSelectorForCustomCV = ({ formik }: { formik: FormikProps<EditCVFormValues> }) => {
	const dispatch: AppDispatch = useDispatch();

	const { paginatedList, pageLoading } = useSelector((state: RootState) => state.jobsSlice);
	const { cadnidateProfile } = useSelector((state: RootState) => state.candidates);


	const missedCandidate = getMissingObjects(cadnidateProfile?.assignedJobs, paginatedList, 'id');

	const options = missedCandidate.map((job) => ({ label: job.title, value: job.id }));

	const debounced = useDebouncedCallback((value) => {
		if (value) {
			dispatch(getJobsList({ page: 1, limit: 10, search: value }));
		}
	}, 400);

	return (
		<Validation
			isValid={formik.isValid}
			isTouched={!!formik.touched.selectedJob}
			invalidFeedback={formik.errors.selectedJob?.value || ''}
			validFeedback=''>
			<SelectReact
				name='jobs'
				onChange={(value) => formik.setFieldValue('selectedJob', value)}
				isLoading={pageLoading}
				value={formik.values.selectedJob}
				options={options}
				onInputChange={(value) => debounced(value)}
			/>
		</Validation>
	);
};
