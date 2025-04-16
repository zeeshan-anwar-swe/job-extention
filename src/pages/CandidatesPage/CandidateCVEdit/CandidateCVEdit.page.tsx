import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../components/ui/Button';
import Breadcrumb from '../../../components/layouts/Breadcrumb/Breadcrumb';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EditCVFormPartial } from './_partial/EditCVForm.partial';
import { useFormik } from 'formik';
import { EditCVRightPartial } from './_partial/EditCVRight.partial';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { getCandidateProfile, updateCandidateProfile } from '../../../store/slices/Candiates.slice';
import PageLoader from '../../../templates/layouts/main/PageLoader';
import { Descendant } from 'slate';
export type EditCVFormValues = {
	name: string;
	roles: string;
	experience: number;
	education: string;
	cvText: string;
};
const CandidateCVEditPage = () => {
	const navigateTo = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { pageLoading, cadnidateProfile, error } = useSelector(
		(state: RootState) => state.candidates,
	);

	const { state } = useLocation();
	const formik = useFormik({
		initialValues: {
			name: '',
			roles: '',
			experience: 0,
			education: '',
			cvText: '',
		},

		validate: (values: EditCVFormValues) => {
			const errors: Partial<EditCVFormValues> = {};

			if (!values.name) {
				errors.name = 'Required';
			} else if (values.name.length < 2) {
				errors.name = 'Name must be at least 2 characters long';
			}

			return errors;
		},
		onSubmit: (values: EditCVFormValues) => {
			console.log('Form submitted:', values);
			const { cvText, roles, experience, education } = formik.values;
			dispatch(
				updateCandidateProfile({
					candidateId: state.id,
					payload: { cv: cvText, roles: [values.roles], experience, education },
				}),
			);
		},
	});

	useEffect(() => {
		if (state) {
			dispatch(getCandidateProfile({ id: state.id, candidateId: state.id }));
		} else {
			navigateTo('/candidates');
		}
	}, [state]);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Candidates' currentPage='Edit Candidate CV' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/candidates'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Candidates
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<PageLoader loading={pageLoading} data={cadnidateProfile} error={error}>
					<Container className='grid grid-cols-12 gap-4'>
						<EditCVFormPartial formik={formik} />
						<EditCVRightPartial formik={formik} />
					</Container>
				</PageLoader>
			</PageWrapper>
		</>
	);
};

export default CandidateCVEditPage;
