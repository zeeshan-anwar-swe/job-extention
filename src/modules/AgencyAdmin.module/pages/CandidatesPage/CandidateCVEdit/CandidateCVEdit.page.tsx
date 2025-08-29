import Container from '../../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../../components/ui/Button';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EditCVFormPartial } from './_partial/EditCVForm.partial';
import { useFormik } from 'formik';
import { EditCVRightPartial } from './_partial/EditCVRight.partial';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import {
	getCandidateProfile,
	setCandidateProfile,
	updateCandidateProfile,
} from '../../../../../store/slices/Candiates.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import { getSocialLinkWithId } from '../../../../../utils/helper';
import { Descendant } from 'slate';

export type EditCVFormValues = {
	isShowImage: boolean;
	name: string;
	about: string;
	location: string;
	availabilty: string;
	roles: string[];
	experience: number;
	education: string;
	cvText: Descendant[];
	LinkedIn: string;
	GitHub: string;
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
			isShowImage: false,
			name: '',
			about: '',
			availabilty: '',
			location: '',
			roles: [],
			experience: 0,
			education: '',
			cvText: JSON.parse('[{"type":"paragraph","children":[{"text":""}]}]') as Descendant[],
			LinkedIn: '',
			GitHub: '',
		},

		validate: (values: EditCVFormValues) => {
			const errors: Partial<EditCVFormValues> = {};

			if (!values.name) {
				errors.name = 'Required';
			} else if (values.name.length < 2) {
				errors.name = 'Name must be at least 2 characters long';
			}
			// // Add validation for required GitHub field
			if (!values.GitHub) {
				errors.GitHub = 'GitHub profile is required';
			} 

			// // Add validation for required LinkedIn field
			// if (!values.LinkedIn) {
			// 	errors.LinkedIn = 'LinkedIn profile is required';
			// } else if (!values.LinkedIn.includes('linkedin.com')) {
			// 	errors.LinkedIn = 'Must be a valid URL ex: linkedin.com/in/user-name';
			// }

			return errors;
		},
		onSubmit: async (values: EditCVFormValues) => {
			const {
				cvText,
				isShowImage,
				roles,
				experience,
				education,
				LinkedIn,
				GitHub,
				about,
				availabilty,
				location,
			} = values;

			const preGitHub: { id: string; link: string } | null = getSocialLinkWithId(
				cadnidateProfile?.profile?.socialProfiles ?? [],
				'GitHub',
			);
			// const preLinkedIn: { id: string; link: string } | null = getSocialLinkWithId(
			// 	cadnidateProfile?.profile?.socialProfiles ?? [],
			// 	'LinkedIn',
			// );

			const stringifiedCVText = await JSON.stringify(cvText);

			await dispatch(
				updateCandidateProfile({
					candidateId: state.selectedJob.id,
					payload: {
						cv: stringifiedCVText,
						isShowImage,
						about,
						roles,
						experience,
						education,
						socialProfiles: [
							preGitHub
								? { id: preGitHub.id, provider: 'GitHub', link: GitHub }
								: { provider: 'GitHub', link: GitHub },
							// preLinkedIn
							// 	? { id: preLinkedIn.id, provider: 'LinkedIn', link: LinkedIn }
							// 	: { provider: 'LinkedIn', link: LinkedIn },
						],
					},
				}),
			);

			navigateTo('/candidates');
		},
	});

	useEffect(() => {
		if (state) {
			dispatch(
				getCandidateProfile({ id: state.selectedJob.id, candidateId: state.candidate.id }),
			);
		} else {
			navigateTo('/candidates');
		}

		return () => {
			dispatch(setCandidateProfile(null));
		};
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
			<PageWrapper name='Candidate CV'>
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
