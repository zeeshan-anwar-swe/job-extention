import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardSubTitle,
	CardTitle,
} from '../../../../../../components/ui/Card';
import { FormikProps } from 'formik';
import Button from '../../../../../../components/ui/Button';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../../utils/validationCheck';
import { EditCVFormValues } from '../CandidateCVEdit.page';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
import useImageValidation from '../../../../../../hooks/useImageValidation';
import { getCandidateCV } from '../../../../services/candidates';
import Icon from '../../../../../../components/icon/Icon';

export const EditCVRightPartial = ({ formik }: { formik: FormikProps<EditCVFormValues> }) => {
	const { componentLoading, cadnidateProfile } = useSelector(
		(state: RootState) => state.candidates,
	);

	console.log({ cadnidateProfile });

	const { state } = useLocation();

	const { loading, imageUrl } = useImageValidation(
		cadnidateProfile?.candidate?.profilePictureUrl,
	);

	const handleDownloadCV = async () => {
		const response = await getCandidateCV(cadnidateProfile.id);
		const url = window.URL.createObjectURL(response.data);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${cadnidateProfile.id}.pdf`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		window.URL.revokeObjectURL(url);
	};

	return (
		<Card className='col-span-3 h-full w-full max-lg:col-span-12 '>
			<CardHeader onClick={handleDownloadCV} className='!items-start hover:cursor-pointer'>
				<div>
					<CardTitle>Preview</CardTitle>
					<CardSubTitle className='cursor-pointer font-light'>
						Download and Preview CV.
					</CardSubTitle>
				</div>
				<Icon size='text-xl' icon='HeroArrowUpRight' color='blue' />
			</CardHeader>
			<CardBody>
				<ImageLoaderWraper loading={loading} height='h-full'>
					<img
						className='aspect-square w-full rounded-xl object-cover'
						src={imageUrl}
						alt='profile-image'
					/>
				</ImageLoaderWraper>
				<div>
					<h3>{textValidationCheck(cadnidateProfile?.candidate?.name)}</h3>
					<p className='font-light'>
						{textValidationCheck(cadnidateProfile?.candidate?.email)}
					</p>
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterChild className='flex w-full items-center'>
					<Link to='/candidates'>
						<Button variant='outline' color='zinc'>
							Cancel
						</Button>
					</Link>
					<Button
						isLoading={componentLoading}
						onClick={() => formik.handleSubmit()}
						className='flex-1'
						variant='solid'>
						Save and Update CV
					</Button>
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};
