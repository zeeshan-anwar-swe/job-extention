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
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import ImageLoaderWraper from '../../../../../../components/ui/ImageLoaderWraper';
import useImageValidation from '../../../../../../hooks/useImageValidation';

export const EditCVRightPartial = ({ formik }: { formik: FormikProps<EditCVFormValues> }) => {
	const { componentLoading, cadnidateProfile } = useSelector(
		(state: RootState) => state.candidates,
	);

	const { loading, imageUrl } = useImageValidation(cadnidateProfile?.candidate?.image);

	return (
		<Card className='col-span-3 h-full w-full max-lg:col-span-12 '>
			<CardHeader className='!block'>
					<CardTitle>Preview</CardTitle>
					<CardSubTitle className='font-light'>Download and Preview CV.</CardSubTitle>
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
